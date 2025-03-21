# quotes/models.py
from django.db import models

class Quote(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Item Details
    item_number = models.CharField(max_length=100)
    description = models.TextField()
    customer_part_number = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    manufacturer_part_number = models.CharField(max_length=100)
    
    # Assembly Details
    assembly_qty = models.IntegerField()
    units = models.CharField(max_length=20)
    
    # Costs
    total_basic_cost = models.DecimalField(max_digits=10, decimal_places=2)
    material_overhead = models.DecimalField(max_digits=10, decimal_places=2)
    warranty_cost = models.DecimalField(max_digits=10, decimal_places=2)
    material_cost_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    per_unit_cost_inc_profit = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Supplier Information
    supplier = models.CharField(max_length=100)
    date_checked = models.DateField()
    lead_time = models.IntegerField()
    
    # Additional Charges
    delivery_charge = models.DecimalField(max_digits=10, decimal_places=2)
    coc_charge = models.DecimalField(max_digits=10, decimal_places=2)
    tooling_charge = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Comments
    comments = models.TextField(blank=True)

    def __str__(self):
        return f"Quote {self.id} - {self.item_number} ({self.created_at})"