# quotes/views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from decimal import Decimal

def calculate_costs(assembly_qty, unit_cost, moq, quantity_required):
    """Calculate costs for a single row"""
    extended_cost = max(0, quantity_required * unit_cost)
    excess_moq_cost = max(0, (moq - quantity_required) * unit_cost) if moq > quantity_required else Decimal('0')
    total_cost = extended_cost + excess_moq_cost
    return extended_cost, excess_moq_cost, total_cost

def calculate_summary_costs(total_extended_cost, total_moq_cost, assembly_qty):
    """Calculate summary costs"""
    total_basic_cost = max(0, total_extended_cost)
    material_overhead = max(0, total_basic_cost * Decimal('0.1'))  # 10% overhead
    warranty = max(0, (total_basic_cost + material_overhead) * Decimal('0.1'))  # 10% warranty
    material_cost_per_unit = max(0, (total_basic_cost + material_overhead + warranty) / assembly_qty)
    material_cost_unit = max(0, material_cost_per_unit * Decimal('1.1'))  # 10% profit
    total_moq = max(0, total_moq_cost)
    per_unit_moq = max(0, total_moq / assembly_qty)
    
    return {
        'total_basic_cost': total_basic_cost,
        'material_overhead': material_overhead,
        'warranty_cost': warranty,
        'material_cost_per_unit': material_cost_per_unit,
        'per_unit_cost_inc_profit': material_cost_unit,
        'total_moq_cost': total_moq,
        'per_unit_moq_cost': per_unit_moq
    }

@csrf_exempt
def update_costs(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        assembly_qty = Decimal(str(data.get('assembly_qty', 1)))
        
        # Process 1x quantity calculations
        page3_data = data.get('page3_data', [])
        total_extended_cost = Decimal('0')
        total_moq_cost = Decimal('0')
        
        for row in page3_data:
            quantity = Decimal(str(assembly_qty))
            unit_cost = Decimal(str(row.get('unit_cost', 0)))
            moq = Decimal(str(row.get('moq', 0)))
            extended_cost, excess_moq_cost, _ = calculate_costs(assembly_qty, unit_cost, moq, quantity)
            total_extended_cost += extended_cost
            total_moq_cost += excess_moq_cost
        
        costs_1x = calculate_summary_costs(total_extended_cost, total_moq_cost, Decimal('1'))
        
        # Process 15x quantity calculations
        page4_data = data.get('page4_data', [])
        total_extended_cost_15 = Decimal('0')
        total_moq_cost_15 = Decimal('0')
        
        for row in page4_data:
            quantity = Decimal(str(assembly_qty * 15))
            unit_cost = Decimal(str(row.get('unit_cost', 0)))
            moq = Decimal(str(row.get('moq', 0)))
            extended_cost, excess_moq_cost, _ = calculate_costs(assembly_qty, unit_cost, moq, quantity)
            total_extended_cost_15 += extended_cost
            total_moq_cost_15 += excess_moq_cost
        
        costs_15x = calculate_summary_costs(total_extended_cost_15, total_moq_cost_15, Decimal('15'))
        
        # Get additional charges
        delivery_charges = Decimal(str(data.get('delivery_charges_total', 0)))
        coc_charges = Decimal(str(data.get('coc_charges_total', 0)))
        tooling_charges = Decimal(str(data.get('tooling_charges_total', 0)))
        
        # Calculate total cost
        total_cost = (
            # 1x quantity costs
            costs_1x['total_basic_cost'] + 
            costs_1x['material_overhead'] + 
            costs_1x['warranty_cost'] + 
            costs_1x['total_moq_cost'] +
            # 15x quantity costs
            costs_15x['total_basic_cost'] + 
            costs_15x['material_overhead'] + 
            costs_15x['warranty_cost'] + 
            costs_15x['total_moq_cost'] +
            # Additional charges
            delivery_charges + 
            coc_charges + 
            tooling_charges
        )
        
        response_data = {
            **costs_1x,
            **{f"{k}_15": v for k, v in costs_15x.items()},
            'delivery_charges_total': delivery_charges,
            'coc_charges_total': coc_charges,
            'tooling_charges_total': tooling_charges,
            'total_cost': total_cost
        }
        
        return JsonResponse({k: str(v) for k, v in response_data.items()})
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def index(request):
    return render(request, 'quotes/index.html')

def stored_quotes(request):
    # This view will be implemented when we add quote storage functionality
    return render(request, 'quotes/stored_quotes.html')