// Page Navigation and Form Handling
let currentPage = 1;
const totalPages = 6;

function navigatePages(direction) {
    if (currentPage === totalPages && direction === 1) {
        // When clicking Finish on the last page
        try {
            saveQuoteData();
            window.location.href = "/stored_quotes/";
        } catch (error) {
            console.error('Error saving quote:', error);
            alert('Error saving quote. Please try again.');
        }
        return;
    }

    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage += direction;
    document.getElementById(`page${currentPage}`).classList.add("active");

    const prevButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");

    if (currentPage === 1) {
        prevButton.style.visibility = "hidden";
    } else {
        prevButton.style.visibility = "visible";
    }

    nextButton.textContent = currentPage === totalPages ? "Finish" : "Next";
    nextButton.style.visibility = "visible"; // Ensure the button is always visible
    document.querySelector(".page-number").textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to go to a specific page
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage = pageNumber;
    document.getElementById(`page${currentPage}`).classList.add("active");

    const prevButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");

    prevButton.style.visibility = currentPage === 1 ? "hidden" : "visible";
    nextButton.textContent = currentPage === totalPages ? "Finish" : "Next";
    document.querySelector(".page-number").textContent = `Page ${currentPage} of ${totalPages}`;
}

// Add new function to handle adding items for each page
function addItemRow(pageNumber) {
    const itemsTable = document.querySelector(`#page${pageNumber} table tbody`);
    if (!itemsTable) return;

    const newRow = document.createElement('tr');
    
    if (pageNumber === 6) { // Comments
        const commentCount = itemsTable.children.length;
        newRow.innerHTML = `
            <td style="padding: 15px;">
                <textarea name="comments_${commentCount + 1}" placeholder="Add any additional notes here..." class="form-control" style="width: 100%; min-height: 100px; resize: vertical; margin-bottom: 0;"></textarea>
            </td>
            <td style="vertical-align: middle; text-align: center;">
                <button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </td>
        `;
        itemsTable.appendChild(newRow);
        return;
    }
    
    // Handle other cases
    switch(pageNumber) {
        case 1: // Item Details
            newRow.innerHTML = `
                <td><input type="text" name="item_number" placeholder="Enter item number" class="form-control"></td>
                <td><input type="text" name="description" placeholder="Enter description" class="form-control"></td>
                <td><input type="text" name="customer_part_number" placeholder="Enter customer part number" class="form-control"></td>
                <td><input type="text" name="manufacturer" placeholder="Enter manufacturer" class="form-control"></td>
                <td><input type="text" name="manufacturer_part_number" placeholder="Enter manufacturer's part number" class="form-control"></td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            `;
            break;
        case 2: // Assembly Quantity
            newRow.innerHTML = `
                <td><input type="number" placeholder="Enter quantity per assembly" name="assembly_qty" class="form-control"></td>
                <td><input type="text" placeholder="Enter units (e.g., EA, KG)" name="units" class="form-control"></td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            `;
            break;
        case 3: // Assembly Quantity: 1
            newRow.innerHTML = `
                <td><input type="number" name="quantity_required" placeholder="Quantity Required" class="form-control"></td>
                <td><input type="number" step="0.01" name="unit_cost" placeholder="Unit Cost" class="form-control"></td>
                <td><input type="number" step="0.01" name="extended_cost" placeholder="Extended Cost" class="form-control" readonly></td>
                <td><input type="number" name="moq" placeholder="MOQ" class="form-control"></td>
                <td><input type="number" step="0.01" name="excess_moq_cost" placeholder="Excess MOQ Cost" class="form-control"></td>
                <td><input type="number" step="0.01" name="total_cost" placeholder="Total Cost" class="form-control" readonly></td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            `;
            break;
        case 4: // Assembly Quantity: 15
            newRow.innerHTML = `
                <td><input type="number" name="quantity_required_15" placeholder="Quantity Required" class="form-control"></td>
                <td><input type="number" step="0.01" name="unit_cost_15" placeholder="Unit Cost" class="form-control"></td>
                <td><input type="number" step="0.01" name="extended_cost_15" placeholder="Extended Cost" class="form-control" readonly></td>
                <td><input type="number" name="moq_15" placeholder="MOQ" class="form-control"></td>
                <td><input type="number" step="0.01" name="excess_moq_cost_15" placeholder="Excess MOQ Cost" class="form-control"></td>
                <td><input type="number" step="0.01" name="total_cost_15" placeholder="Total Cost" class="form-control" readonly></td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            `;
            break;
        case 5: // Supplier Information & Charges
            newRow.innerHTML = `
                <td><input type="text" placeholder="Enter supplier" name="supplier" class="form-control"></td>
                <td><input type="date" name="date_checked" class="form-control"></td>
                <td><input type="number" placeholder="Enter lead time" name="lead_time" class="form-control"></td>
                <td><input type="number" step="0.01" placeholder="Enter delivery charge" name="delivery_charge" class="form-control" value="0.00"></td>
                <td><input type="number" step="0.01" placeholder="Enter C of C charge" name="coc_charge" class="form-control" value="0.00"></td>
                <td><input type="number" step="0.01" placeholder="Enter tooling charge" name="tooling_charge" class="form-control" value="0.00"></td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            `;
            break;
    }
    
    itemsTable.appendChild(newRow);
    if (pageNumber !== 6) {
        setupCalculations(newRow, pageNumber);
    }
}

// Function to remove item row
function removeItemRow(button) {
    const row = button.closest('tr');
    const table = row.closest('table');
    if (table.querySelectorAll('tbody tr').length > 1) {
        row.remove();
        // Check if this is page 5 and update totals if needed
        if (table.closest('#page5')) {
            updatePage5Totals();
        }
        updateTotalCosts();
    } else {
        alert('Cannot remove the last item row');
    }
}

// Setup calculations for cost fields
function setupCalculations(row, pageNumber) {
    if (pageNumber === 5) {
        // Get all charge inputs that should trigger calculations
        const chargeInputs = [
            row.querySelector('[name="delivery_charge"]'),
            row.querySelector('[name="coc_charge"]'),
            row.querySelector('[name="tooling_charge"]')
        ].filter(input => input !== null);

        // Add event listeners to each charge input
        chargeInputs.forEach(input => {
            input.addEventListener('input', () => {
                updatePage5Totals();
                updateTotalCosts();
            });
        });
        return;
    }

    const suffix = pageNumber === 4 ? '_15' : '';
    
    // Get all input elements that should trigger calculations
    const inputs = [
        row.querySelector(`[name="unit_cost${suffix}"]`),
        row.querySelector(`[name="moq${suffix}"]`),
        row.querySelector(`[name="excess_moq_cost${suffix}"]`)
    ].filter(input => input !== null);

    // Add event listeners to each input
    inputs.forEach(input => {
        input.addEventListener('input', updateTotalCosts);
    });
}

// Add new function to handle page 5 totals
function updatePage5Totals() {
    const table5 = document.querySelector('#page5 table tbody');
    if (!table5) return;

    let deliveryChargesTotal = 0;
    let cocChargesTotal = 0;
    let toolingChargesTotal = 0;

    // Sum up all charges from each supplier row
    table5.querySelectorAll('tr').forEach(row => {
        deliveryChargesTotal += parseFloat(row.querySelector('[name="delivery_charge"]')?.value || 0);
        cocChargesTotal += parseFloat(row.querySelector('[name="coc_charge"]')?.value || 0);
        toolingChargesTotal += parseFloat(row.querySelector('[name="tooling_charge"]')?.value || 0);
    });

    // Update the total fields
    const deliveryTotalField = document.querySelector('#page5 [name="delivery_charges_total"]');
    const cocTotalField = document.querySelector('#page5 [name="coc_charges_total"]');
    const toolingTotalField = document.querySelector('#page5 [name="tooling_charges_total"]');

    if (deliveryTotalField) deliveryTotalField.value = deliveryChargesTotal.toFixed(2);
    if (cocTotalField) cocTotalField.value = cocChargesTotal.toFixed(2);
    if (toolingTotalField) toolingTotalField.value = toolingChargesTotal.toFixed(2);
}

// Update total costs
async function updateTotalCosts() {
    // Get assembly quantity from page 2
    const assemblyQty = Math.max(0, parseFloat(document.querySelector('[name="assembly_qty"]')?.value) || 1);
    
    // Collect page 3 data
    const table3 = document.querySelector('#page3 table tbody');
    const page3Data = [];
    if (table3) {
        table3.querySelectorAll('tr').forEach(row => {
            const unitCost = parseFloat(row.querySelector('[name="unit_cost"]')?.value || 0);
            const moq = parseFloat(row.querySelector('[name="moq"]')?.value || 0);
            const quantityRequired = assemblyQty;
            const extendedCost = quantityRequired * unitCost;
            const excessMoqCost = moq > quantityRequired ? Math.max(0, (moq - quantityRequired) * unitCost) : 0;
            const totalCost = extendedCost + excessMoqCost;

            page3Data.push({
                unit_cost: unitCost,
                moq: moq,
                quantity_required: quantityRequired,
                extended_cost: extendedCost,
                excess_moq_cost: excessMoqCost,
                total_cost: totalCost
            });

            // Update row values
            row.querySelector('[name="quantity_required"]').value = quantityRequired.toFixed(2);
            row.querySelector('[name="extended_cost"]').value = extendedCost.toFixed(2);
            row.querySelector('[name="excess_moq_cost"]').value = excessMoqCost.toFixed(2);
            row.querySelector('[name="total_cost"]').value = totalCost.toFixed(2);
        });
    }

    // Collect page 4 data
    const table4 = document.querySelector('#page4 table tbody');
    const page4Data = [];
    if (table4) {
        table4.querySelectorAll('tr').forEach(row => {
            const unitCost = parseFloat(row.querySelector('[name="unit_cost_15"]')?.value || 0);
            const moq = parseFloat(row.querySelector('[name="moq_15"]')?.value || 0);
            const quantityRequired = assemblyQty * 15;
            const extendedCost = quantityRequired * unitCost;
            const excessMoqCost = moq > quantityRequired ? Math.max(0, (moq - quantityRequired) * unitCost) : 0;
            const totalCost = extendedCost + excessMoqCost;

            page4Data.push({
                unit_cost: unitCost,
                moq: moq,
                quantity_required: quantityRequired,
                extended_cost: extendedCost,
                excess_moq_cost: excessMoqCost,
                total_cost: totalCost
            });

            // Update row values
            row.querySelector('[name="quantity_required_15"]').value = quantityRequired.toFixed(2);
            row.querySelector('[name="extended_cost_15"]').value = extendedCost.toFixed(2);
            row.querySelector('[name="excess_moq_cost_15"]').value = excessMoqCost.toFixed(2);
            row.querySelector('[name="total_cost_15"]').value = totalCost.toFixed(2);
        });
    }

    // Update page 5 totals first
    updatePage5Totals();

    // Get additional charges
    const deliveryChargesTotal = parseFloat(document.querySelector('#page5 [name="delivery_charges_total"]')?.value || 0);
    const cocChargesTotal = parseFloat(document.querySelector('#page5 [name="coc_charges_total"]')?.value || 0);
    const toolingChargesTotal = parseFloat(document.querySelector('#page5 [name="tooling_charges_total"]')?.value || 0);

    try {
        // Send data to backend for calculations
        const response = await fetch('/update_costs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assembly_qty: assemblyQty,
                page3_data: page3Data,
                page4_data: page4Data,
                delivery_charges_total: deliveryChargesTotal,
                coc_charges_total: cocChargesTotal,
                tooling_charges_total: toolingChargesTotal
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Update page 3 summary fields
        document.querySelector('#page3 [name="total_basic_cost"]').value = parseFloat(data.total_basic_cost).toFixed(2);
        document.querySelector('#page3 [name="material_overhead"]').value = parseFloat(data.material_overhead).toFixed(2);
        document.querySelector('#page3 [name="warranty_cost"]').value = parseFloat(data.warranty_cost).toFixed(2);
        document.querySelector('#page3 [name="material_cost_per_unit"]').value = parseFloat(data.material_cost_per_unit).toFixed(2);
        document.querySelector('#page3 [name="per_unit_cost_inc_profit"]').value = parseFloat(data.per_unit_cost_inc_profit).toFixed(2);
        document.querySelector('#page3 [name="total_moq_cost"]').value = parseFloat(data.total_moq_cost).toFixed(2);
        document.querySelector('#page3 [name="per_unit_moq_cost"]').value = parseFloat(data.per_unit_moq_cost).toFixed(2);

        // Update page 4 summary fields
        document.querySelector('#page4 [name="total_basic_cost_15"]').value = parseFloat(data.total_basic_cost_15).toFixed(2);
        document.querySelector('#page4 [name="material_overhead_15"]').value = parseFloat(data.material_overhead_15).toFixed(2);
        document.querySelector('#page4 [name="warranty_cost_15"]').value = parseFloat(data.warranty_cost_15).toFixed(2);
        document.querySelector('#page4 [name="material_cost_per_unit_15"]').value = parseFloat(data.material_cost_per_unit_15).toFixed(2);
        document.querySelector('#page4 [name="per_unit_cost_inc_profit_15"]').value = parseFloat(data.per_unit_cost_inc_profit_15).toFixed(2);
        document.querySelector('#page4 [name="total_moq_cost_15"]').value = parseFloat(data.total_moq_cost_15).toFixed(2);
        document.querySelector('#page4 [name="per_unit_moq_cost_15"]').value = parseFloat(data.per_unit_moq_cost_15).toFixed(2);

    } catch (error) {
        console.error('Error updating costs:', error);
    }
}

// Quote Data Management
function saveQuoteData() {
    const editQuoteIndex = localStorage.getItem("editQuoteIndex");
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

    // Get the next quote number
    let nextQuoteNumber = 1;
    if (quotes.length > 0) {
        // Find the highest quote number and increment it
        const maxQuoteNumber = Math.max(...quotes.map(q => {
            const num = parseInt(q.quoteNumber);
            return isNaN(num) ? 0 : num;
        }));
        nextQuoteNumber = maxQuoteNumber + 1;
    }

    // Format quote number with leading zeros (e.g., 001, 002, etc.)
    const formattedQuoteNumber = nextQuoteNumber.toString().padStart(3, '0');

    // Get all rows from the items table
    const itemRows = document.querySelectorAll('#page1 table tbody tr');
    const items = Array.from(itemRows).map(row => {
        const inputs = row.querySelectorAll('input');
        return {
            itemNumber: inputs[0].value || '',
            description: inputs[1].value || '',
            customerPartNumber: inputs[2].value || '',
            manufacturer: inputs[3].value || '',
            manufacturerPartNumber: inputs[4].value || ''
        };
    });

    // Get assembly quantity and units from page 2
    const assemblyQty = document.querySelector('[name="assembly_qty"]')?.value || '0';
    const units = document.querySelector('[name="units"]')?.value || '';

    // Get data from page 3 table
    const page3Rows = document.querySelectorAll('#page3 table tbody tr');
    const page3Data = Array.from(page3Rows).map(row => ({
        quantityRequired: row.querySelector('[name="quantity_required"]')?.value || '0',
        unitCost: row.querySelector('[name="unit_cost"]')?.value || '0',
        extendedCost: row.querySelector('[name="extended_cost"]')?.value || '0',
        moq: row.querySelector('[name="moq"]')?.value || '0',
        excessMoqCost: row.querySelector('[name="excess_moq_cost"]')?.value || '0',
        totalCost: row.querySelector('[name="total_cost"]')?.value || '0'
    }));

    // Get data from page 4 table
    const page4Rows = document.querySelectorAll('#page4 table tbody tr');
    const page4Data = Array.from(page4Rows).map(row => ({
        quantityRequired: row.querySelector('[name="quantity_required_15"]')?.value || '0',
        unitCost: row.querySelector('[name="unit_cost_15"]')?.value || '0',
        extendedCost: row.querySelector('[name="extended_cost_15"]')?.value || '0',
        moq: row.querySelector('[name="moq_15"]')?.value || '0',
        excessMoqCost: row.querySelector('[name="excess_moq_cost_15"]')?.value || '0',
        totalCost: row.querySelector('[name="total_cost_15"]')?.value || '0'
    }));

    // Get data from page 5 table (supplier information)
    const supplierRows = document.querySelectorAll('#page5 table tbody tr');
    const supplierData = Array.from(supplierRows).map(row => ({
        supplier: row.querySelector('[name="supplier"]')?.value || '',
        dateChecked: row.querySelector('[name="date_checked"]')?.value || '',
        leadTime: row.querySelector('[name="lead_time"]')?.value || '',
        deliveryCharge: row.querySelector('[name="delivery_charge"]')?.value || '0',
        cocCharge: row.querySelector('[name="coc_charge"]')?.value || '0',
        toolingCharge: row.querySelector('[name="tooling_charge"]')?.value || '0'
    }));

    // Get costs from page 3
    const totalBasicCost = parseFloat(document.querySelector('#page3 [name="total_basic_cost"]')?.value) || 0;
    const materialOverhead = parseFloat(document.querySelector('#page3 [name="material_overhead"]')?.value) || 0;
    const warrantyCost = parseFloat(document.querySelector('#page3 [name="warranty_cost"]')?.value) || 0;
    const materialCostPerUnit = parseFloat(document.querySelector('#page3 [name="material_cost_per_unit"]')?.value) || 0;
    const perUnitCostIncProfit = parseFloat(document.querySelector('#page3 [name="per_unit_cost_inc_profit"]')?.value) || 0;
    const totalMOQCost = parseFloat(document.querySelector('#page3 [name="total_moq_cost"]')?.value) || 0;
    const perUnitMOQCost = parseFloat(document.querySelector('#page3 [name="per_unit_moq_cost"]')?.value) || 0;

    // Get costs from page 4
    const totalBasicCost15 = parseFloat(document.querySelector('#page4 [name="total_basic_cost_15"]')?.value) || 0;
    const materialOverhead15 = parseFloat(document.querySelector('#page4 [name="material_overhead_15"]')?.value) || 0;
    const warrantyCost15 = parseFloat(document.querySelector('#page4 [name="warranty_cost_15"]')?.value) || 0;
    const materialCostPerUnit15 = parseFloat(document.querySelector('#page4 [name="material_cost_per_unit_15"]')?.value) || 0;
    const perUnitCostIncProfit15 = parseFloat(document.querySelector('#page4 [name="per_unit_cost_inc_profit_15"]')?.value) || 0;
    const totalMOQCost15 = parseFloat(document.querySelector('#page4 [name="total_moq_cost_15"]')?.value) || 0;
    const perUnitMOQCost15 = parseFloat(document.querySelector('#page4 [name="per_unit_moq_cost_15"]')?.value) || 0;

    // Get supplier charges from page 5
    const deliveryChargesTotal = parseFloat(document.querySelector('#page5 [name="delivery_charges_total"]')?.value) || 0;
    const cocChargesTotal = parseFloat(document.querySelector('#page5 [name="coc_charges_total"]')?.value) || 0;
    const toolingChargesTotal = parseFloat(document.querySelector('#page5 [name="tooling_charges_total"]')?.value) || 0;

    // Get comments from page 6
    const comments = Array.from(document.querySelectorAll('#page6 textarea')).map(textarea => textarea.value || '');

    // Calculate total cost
    const totalCost = (totalBasicCost + materialOverhead + warrantyCost + totalMOQCost) + 
                      (totalBasicCost15 + materialOverhead15 + warrantyCost15 + totalMOQCost15) + 
                      deliveryChargesTotal + cocChargesTotal + toolingChargesTotal;

    const quote = {
        items: items,
        assemblyQty: assemblyQty,
        units: units,
        // Page 3 data
        page3Data: page3Data,
        totalBasicCost: totalBasicCost.toFixed(2),
        materialOverhead: materialOverhead.toFixed(2),
        warrantyCost: warrantyCost.toFixed(2),
        materialCostPerUnit: materialCostPerUnit.toFixed(2),
        perUnitCostIncProfit: perUnitCostIncProfit.toFixed(2),
        totalMOQCost: totalMOQCost.toFixed(2),
        perUnitMOQCost: perUnitMOQCost.toFixed(2),
        // Page 4 data
        page4Data: page4Data,
        totalBasicCost15: totalBasicCost15.toFixed(2),
        materialOverhead15: materialOverhead15.toFixed(2),
        warrantyCost15: warrantyCost15.toFixed(2),
        materialCostPerUnit15: materialCostPerUnit15.toFixed(2),
        perUnitCostIncProfit15: perUnitCostIncProfit15.toFixed(2),
        totalMOQCost15: totalMOQCost15.toFixed(2),
        perUnitMOQCost15: perUnitMOQCost15.toFixed(2),
        // Page 5 data
        supplierData: supplierData,
        deliveryChargesTotal: deliveryChargesTotal.toFixed(2),
        cocChargesTotal: cocChargesTotal.toFixed(2),
        toolingChargesTotal: toolingChargesTotal.toFixed(2),
        // Comments
        comments: comments,
        // Total cost and metadata
        totalCost: totalCost.toFixed(2),
        createdAt: new Date().toISOString(),
        quoteNumber: editQuoteIndex !== null ? quotes[parseInt(editQuoteIndex)].quoteNumber : formattedQuoteNumber
    };

    if (editQuoteIndex !== null) {
        quotes[parseInt(editQuoteIndex)] = quote;
        localStorage.removeItem("editQuoteIndex");
    } else {
        quotes.push(quote);
    }

    localStorage.setItem("quotes", JSON.stringify(quotes));
    window.location.href = "/stored_quotes/";
}

// Quote Form Population
document.addEventListener("DOMContentLoaded", function () {
    const editQuoteIndex = localStorage.getItem("editQuoteIndex");

    if (editQuoteIndex !== null) {
        const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
        const quote = quotes[editQuoteIndex];

        if (quote) {
            // Page 1: Populate item details
            const itemsTable = document.querySelector('#page1 table tbody');
            if (itemsTable && quote.items && quote.items.length > 0) {
                // Clear existing rows except the first one
                while (itemsTable.children.length > 1) {
                    itemsTable.removeChild(itemsTable.lastChild);
                }

                // Populate items
                quote.items.forEach((item, index) => {
                    if (index === 0) {
                        // Update first row
                        const firstRow = itemsTable.firstElementChild;
                        if (firstRow) {
                            const inputs = firstRow.querySelectorAll('input');
                            inputs[0].value = item.itemNumber || '';
                            inputs[1].value = item.description || '';
                            inputs[2].value = item.customerPartNumber || '';
                            inputs[3].value = item.manufacturer || '';
                            inputs[4].value = item.manufacturerPartNumber || '';
                        }
                    } else {
                        // Only add new rows if there's actual data
                        if (item.itemNumber || item.description || item.customerPartNumber || item.manufacturer || item.manufacturerPartNumber) {
                            addItemRow(1);
                            const newRow = itemsTable.lastElementChild;
                            const inputs = newRow.querySelectorAll('input');
                            inputs[0].value = item.itemNumber || '';
                            inputs[1].value = item.description || '';
                            inputs[2].value = item.customerPartNumber || '';
                            inputs[3].value = item.manufacturer || '';
                            inputs[4].value = item.manufacturerPartNumber || '';
                        }
                    }
                });
            }

            // Page 2: Populate assembly quantity details
            document.querySelector('[name="assembly_qty"]').value = quote.assemblyQty || '';
            document.querySelector('[name="units"]').value = quote.units || '';

            // Page 3: Populate table data
            const page3Table = document.querySelector('#page3 table tbody');
            if (page3Table && quote.page3Data && quote.page3Data.length > 0) {
                // Clear existing rows except the first one
                while (page3Table.children.length > 1) {
                    page3Table.removeChild(page3Table.lastChild);
                }

                // Populate rows
                quote.page3Data.forEach((rowData, index) => {
                    if (index === 0) {
                        // Update first row
                        const firstRow = page3Table.firstElementChild;
                        if (firstRow) {
                            firstRow.querySelector('[name="quantity_required"]').value = rowData.quantityRequired;
                            firstRow.querySelector('[name="unit_cost"]').value = rowData.unitCost;
                            firstRow.querySelector('[name="extended_cost"]').value = rowData.extendedCost;
                            firstRow.querySelector('[name="moq"]').value = rowData.moq;
                            firstRow.querySelector('[name="excess_moq_cost"]').value = rowData.excessMoqCost;
                            firstRow.querySelector('[name="total_cost"]').value = rowData.totalCost;
                        }
                    } else {
                        // Only add new rows if there's actual data
                        if (parseFloat(rowData.unitCost) > 0 || parseFloat(rowData.moq) > 0) {
                            addItemRow(3);
                            const newRow = page3Table.lastElementChild;
                            newRow.querySelector('[name="quantity_required"]').value = rowData.quantityRequired;
                            newRow.querySelector('[name="unit_cost"]').value = rowData.unitCost;
                            newRow.querySelector('[name="extended_cost"]').value = rowData.extendedCost;
                            newRow.querySelector('[name="moq"]').value = rowData.moq;
                            newRow.querySelector('[name="excess_moq_cost"]').value = rowData.excessMoqCost;
                            newRow.querySelector('[name="total_cost"]').value = rowData.totalCost;
                        }
                    }
                });
            }

            // Page 4: Populate table data
            const page4Table = document.querySelector('#page4 table tbody');
            if (page4Table && quote.page4Data && quote.page4Data.length > 0) {
                // Clear existing rows except the first one
                while (page4Table.children.length > 1) {
                    page4Table.removeChild(page4Table.lastChild);
                }

                // Populate rows
                quote.page4Data.forEach((rowData, index) => {
                    if (index === 0) {
                        // Update first row
                        const firstRow = page4Table.firstElementChild;
                        if (firstRow) {
                            firstRow.querySelector('[name="quantity_required_15"]').value = rowData.quantityRequired;
                            firstRow.querySelector('[name="unit_cost_15"]').value = rowData.unitCost;
                            firstRow.querySelector('[name="extended_cost_15"]').value = rowData.extendedCost;
                            firstRow.querySelector('[name="moq_15"]').value = rowData.moq;
                            firstRow.querySelector('[name="excess_moq_cost_15"]').value = rowData.excessMoqCost;
                            firstRow.querySelector('[name="total_cost_15"]').value = rowData.totalCost;
                        }
                    } else {
                        // Only add new rows if there's actual data
                        if (parseFloat(rowData.unitCost) > 0 || parseFloat(rowData.moq) > 0) {
                            addItemRow(4);
                            const newRow = page4Table.lastElementChild;
                            newRow.querySelector('[name="quantity_required_15"]').value = rowData.quantityRequired;
                            newRow.querySelector('[name="unit_cost_15"]').value = rowData.unitCost;
                            newRow.querySelector('[name="extended_cost_15"]').value = rowData.extendedCost;
                            newRow.querySelector('[name="moq_15"]').value = rowData.moq;
                            newRow.querySelector('[name="excess_moq_cost_15"]').value = rowData.excessMoqCost;
                            newRow.querySelector('[name="total_cost_15"]').value = rowData.totalCost;
                        }
                    }
                });
            }

            // Page 5: Populate supplier information
            const page5Table = document.querySelector('#page5 table tbody');
            if (page5Table && quote.supplierData && quote.supplierData.length > 0) {
                // Clear existing rows except the first one
                while (page5Table.children.length > 1) {
                    page5Table.removeChild(page5Table.lastChild);
                }

                // Populate supplier rows
                quote.supplierData.forEach((rowData, index) => {
                    if (index === 0) {
                        // Update first row
                        const firstRow = page5Table.firstElementChild;
                        if (firstRow) {
                            firstRow.querySelector('[name="supplier"]').value = rowData.supplier;
                            firstRow.querySelector('[name="date_checked"]').value = rowData.dateChecked;
                            firstRow.querySelector('[name="lead_time"]').value = rowData.leadTime;
                            firstRow.querySelector('[name="delivery_charge"]').value = rowData.deliveryCharge;
                            firstRow.querySelector('[name="coc_charge"]').value = rowData.cocCharge;
                            firstRow.querySelector('[name="tooling_charge"]').value = rowData.toolingCharge;
                        }
                    } else {
                        // Only add new rows if there's actual data
                        if (rowData.supplier || parseFloat(rowData.deliveryCharge) > 0 || parseFloat(rowData.cocCharge) > 0 || parseFloat(rowData.toolingCharge) > 0) {
                            addItemRow(5);
                            const newRow = page5Table.lastElementChild;
                            newRow.querySelector('[name="supplier"]').value = rowData.supplier;
                            newRow.querySelector('[name="date_checked"]').value = rowData.dateChecked;
                            newRow.querySelector('[name="lead_time"]').value = rowData.leadTime;
                            newRow.querySelector('[name="delivery_charge"]').value = rowData.deliveryCharge;
                            newRow.querySelector('[name="coc_charge"]').value = rowData.cocCharge;
                            newRow.querySelector('[name="tooling_charge"]').value = rowData.toolingCharge;
                        }
                    }
                });
            }

            // Populate summary fields
            document.querySelector('#page3 [name="total_basic_cost"]').value = quote.totalBasicCost || '0.00';
            document.querySelector('#page3 [name="material_overhead"]').value = quote.materialOverhead || '0.00';
            document.querySelector('#page3 [name="warranty_cost"]').value = quote.warrantyCost || '0.00';
            document.querySelector('#page3 [name="material_cost_per_unit"]').value = quote.materialCostPerUnit || '0.00';
            document.querySelector('#page3 [name="per_unit_cost_inc_profit"]').value = quote.perUnitCostIncProfit || '0.00';
            document.querySelector('#page3 [name="total_moq_cost"]').value = quote.totalMOQCost || '0.00';
            document.querySelector('#page3 [name="per_unit_moq_cost"]').value = quote.perUnitMOQCost || '0.00';

            document.querySelector('#page4 [name="total_basic_cost_15"]').value = quote.totalBasicCost15 || '0.00';
            document.querySelector('#page4 [name="material_overhead_15"]').value = quote.materialOverhead15 || '0.00';
            document.querySelector('#page4 [name="warranty_cost_15"]').value = quote.warrantyCost15 || '0.00';
            document.querySelector('#page4 [name="material_cost_per_unit_15"]').value = quote.materialCostPerUnit15 || '0.00';
            document.querySelector('#page4 [name="per_unit_cost_inc_profit_15"]').value = quote.perUnitCostIncProfit15 || '0.00';
            document.querySelector('#page4 [name="total_moq_cost_15"]').value = quote.totalMOQCost15 || '0.00';
            document.querySelector('#page4 [name="per_unit_moq_cost_15"]').value = quote.perUnitMOQCost15 || '0.00';

            document.querySelector('#page5 [name="delivery_charges_total"]').value = quote.deliveryChargesTotal || '0.00';
            document.querySelector('#page5 [name="coc_charges_total"]').value = quote.cocChargesTotal || '0.00';
            document.querySelector('#page5 [name="tooling_charges_total"]').value = quote.toolingChargesTotal || '0.00';

            // Page 6: Populate comments
            const commentsTable = document.querySelector('#page6 table tbody');
            if (commentsTable && quote.comments && quote.comments.length > 0) {
                // Clear existing comments except the first one
                while (commentsTable.children.length > 1) {
                    commentsTable.removeChild(commentsTable.lastChild);
                }

                // Populate comments
                quote.comments.forEach((comment, index) => {
                    if (index === 0) {
                        // Update first comment
                        const firstRow = commentsTable.firstElementChild;
                        if (firstRow) {
                            firstRow.querySelector('textarea').value = comment;
                        }
                    } else {
                        // Add new rows for additional comments
                        addItemRow(6);
                        const newRow = commentsTable.lastElementChild;
                        newRow.querySelector('textarea').value = comment;
                    }
                });
            }

            // Update calculations
            updateTotalCosts();
        }
    }
});

// Stored Quotes Management
function loadQuotes() {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const tableBody = document.getElementById('quote-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = "";
    quotes.forEach((quote, index) => {
        const row = document.createElement('tr');
        
        // Get the first item if it exists
        const item = quote.items && quote.items.length > 0 ? quote.items[0] : null;
        
        row.innerHTML = `
            <td style="text-align: center">${index + 1}</td>
            <td>${item ? item.itemNumber || '-' : '-'}</td>
            <td>${item ? item.description || '-' : '-'}</td>
            <td>${item ? item.customerPartNumber || '-' : '-'}</td>
            <td>${item ? item.manufacturer || '-' : '-'}</td>
            <td>${item ? item.manufacturerPartNumber || '-' : '-'}</td>
            <td>£${parseFloat(quote.totalCost || 0).toFixed(2)}</td>
            <td class="actions-cell">
                <div class="actions-group">
                    <button class="btn btn-primary btn-sm" onclick="downloadQuote(${index})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="editQuote(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteQuote(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add these functions for button functionality
function downloadQuote(quoteIndex) {
    try {
        // Check if PDF libraries are loaded
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
            throw new Error('PDF library not loaded. Please refresh the page and try again.');
        }

        const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
        const quote = quotes[quoteIndex];
        if (!quote) {
            throw new Error('Quote not found');
        }

        // Create new document with explicit orientation and format
        const doc = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Verify that autoTable is available
        if (typeof doc.autoTable !== 'function') {
            throw new Error('PDF AutoTable plugin not properly initialized. Please refresh the page.');
        }

        // Set document properties
        doc.setProperties({
            title: `Quote ${quote.quoteNumber}`,
            subject: 'Quote Details',
            author: 'Quote Generator',
            keywords: 'quote, pdf, details',
            creator: 'Quote Generator System'
        });

        // PAGE 1: Cover Page with Header and Item Details
        // Add fancy header with gradient-like effect
        doc.setFillColor(231, 76, 60); // Primary red
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
        doc.setFillColor(231, 76, 60); // Secondary red
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');

        // Add company name/logo area
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('PROTRONIX', 15, 15);

        // Add quote title
        doc.setFontSize(16);
        doc.setFont(undefined, 'normal');
        doc.text('QUOTATION', doc.internal.pageSize.getWidth() - 15, 15, { align: 'right' });

        // Add decorative line
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(15, 20, doc.internal.pageSize.getWidth() - 15, 20);

        // Reset text color to black
        doc.setTextColor(0, 0, 0);

        // Add quote information in a modern box
        doc.setFillColor(241, 241, 241);
        doc.rect(15, 45, doc.internal.pageSize.getWidth() - 30, 25, 'F');
        
        // Quote details in the box
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Left side information
        doc.setFont(undefined, 'bold');
        doc.text('QUOTE DETAILS', 20, 52);
        doc.setFont(undefined, 'normal');
        doc.text(`Quote Number: ${quote.quoteNumber}`, 20, 58);
        doc.text(`Date: ${new Date(quote.createdAt).toLocaleDateString()}`, 20, 64);

        // Right side information
        doc.setFont(undefined, 'bold');
        doc.text('ASSEMBLY INFORMATION', doc.internal.pageSize.getWidth() - 80, 52);
        doc.setFont(undefined, 'normal');
        doc.text(`Quantity: ${quote.assemblyQty}`, doc.internal.pageSize.getWidth() - 80, 58);
        doc.text(`Units: ${quote.units}`, doc.internal.pageSize.getWidth() - 80, 64);

        // Add items table with modern styling
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text('Item Details', 15, 80);

        doc.autoTable({
            startY: 85,
            head: [['Item #', 'Description', 'Customer Part #', 'Manufacturer', 'Manufacturer Part #']],
            body: quote.items.map(item => [
                item.itemNumber || '-',
                item.description || '-',
                item.customerPartNumber || '-',
                item.manufacturer || '-',
                item.manufacturerPartNumber || '-'
            ]),
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [231, 76, 60],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [231, 76, 60],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { cellWidth: 25 },
                1: { cellWidth: 50 },
                2: { cellWidth: 35 },
                3: { cellWidth: 35 },
                4: { cellWidth: 35 }
            }
        });

        // PAGE 2: Assembly Quantity Details
        doc.addPage();
        
        // Add page header
        doc.setFillColor(231, 76, 60);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Assembly Quantity Details', 15, 15);

        // Reset text color to black
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Assembly Information', 15, 40);

        // Add assembly quantity table
        doc.autoTable({
            startY: 45,
            head: [['Quantity per Assembly', 'Units']],
            body: [[quote.assemblyQty, quote.units]],
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [231, 76, 60],
                lineWidth: 0.1,
                halign: 'center'
            },
            headStyles: {
                fillColor: [231, 76, 60],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            }
        });

        // PAGE 3: Assembly Quantity 1x Details
        doc.addPage();
        
        // Add page header
        doc.setFillColor(231, 76, 60);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Assembly Quantity (1x) Details', 15, 15);

        // Reset text color to black
        doc.setTextColor(0, 0, 0);

        // Add 1x assembly details table
        doc.autoTable({
            startY: 30,
            head: [['Description', 'Value']],
            body: [
                ['Total Basic Cost', `£${quote.totalBasicCost}`],
                ['Material Overhead', `£${quote.materialOverhead}`],
                ['Warranty Cost', `£${quote.warrantyCost}`],
                ['Material Cost per Unit', `£${quote.materialCostPerUnit}`],
                ['Per Unit Cost (inc. Profit)', `£${quote.perUnitCostIncProfit}`],
                ['Total MOQ Cost', `£${quote.totalMOQCost}`],
                ['Per Unit MOQ Cost', `£${quote.perUnitMOQCost}`]
            ],
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [231, 76, 60],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [231, 76, 60],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            }
        });

        // PAGE 4: Assembly Quantity 15x Details
        doc.addPage();
        
        // Add page header
        doc.setFillColor(231, 76, 60);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Assembly Quantity (15x) Details', 15, 15);

        // Reset text color to black
        doc.setTextColor(0, 0, 0);

        // Add 15x assembly details table
        doc.autoTable({
            startY: 30,
            head: [['Description', 'Value']],
            body: [
                ['Total Basic Cost', `£${quote.totalBasicCost15}`],
                ['Material Overhead', `£${quote.materialOverhead15}`],
                ['Warranty Cost', `£${quote.warrantyCost15}`],
                ['Material Cost per Unit', `£${quote.materialCostPerUnit15}`],
                ['Per Unit Cost (inc. Profit)', `£${quote.perUnitCostIncProfit15}`],
                ['Total MOQ Cost', `£${quote.totalMOQCost15}`],
                ['Per Unit MOQ Cost', `£${quote.perUnitMOQCost15}`]
            ],
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [231, 76, 60],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [231, 76, 60],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            }
        });

        // PAGE 5: Supplier Information & Charges
        doc.addPage();
        
        // Add page header
        doc.setFillColor(231, 76, 60);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Supplier Information & Charges', 15, 15);

        // Reset text color to black
        doc.setTextColor(0, 0, 0);

        // Add supplier information table
        doc.autoTable({
            startY: 30,
            head: [['Description', 'Value']],
            body: [
                ['Delivery Charges Total', `£${quote.deliveryChargesTotal || '0.00'}`],
                ['C of C Charges Total', `£${quote.cocChargesTotal || '0.00'}`],
                ['Tooling Charges Total', `£${quote.toolingChargesTotal || '0.00'}`]
            ],
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [231, 76, 60],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [231, 76, 60],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            }
        });

        // PAGE 6: Comments and Summary
        doc.addPage();
        
        // Add page header
        doc.setFillColor(231, 76, 60);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Comments and Summary', 15, 15);

        // Reset text color to black
        doc.setTextColor(0, 0, 0);

        // Add comments section
        if (quote.comments && quote.comments.length > 0) {
            doc.setFont(undefined, 'bold');
            doc.setFontSize(12);
            doc.text('Comments', 15, 30);

            doc.autoTable({
                startY: 35,
                head: [['Comments']],
                body: quote.comments.map(comment => [comment]),
                theme: 'grid',
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    lineColor: [231, 76, 60],
                    lineWidth: 0.1
                },
                headStyles: {
                    fillColor: [231, 76, 60],
                    textColor: [255, 255, 255],
                    fontSize: 10,
                    fontStyle: 'bold'
                }
            });
        }

        // Add final cost summary with professional design
        const summaryY = quote.comments && quote.comments.length > 0 ? 
            doc.previousAutoTable.finalY + 20 : 35;

        // Add professional summary header
        doc.setFillColor(231, 76, 60);
        doc.rect(15, summaryY, doc.internal.pageSize.getWidth() - 30, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text('FINAL COST SUMMARY', doc.internal.pageSize.getWidth()/2, summaryY + 8, { align: 'center' });

        // Reset text color and set up styling
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);

        // Calculate section positions with more space
        const startX = 20;
        const colWidth = (doc.internal.pageSize.getWidth() - 45) / 3;
        const lineHeight = 5;
        const colSpacing = 5;

        // Function to add section with consistent styling
        function addSection(title, items, x, y) {
            // Add section title
            doc.setFont(undefined, 'bold');
            doc.setFontSize(9);
            doc.setFillColor(241, 241, 241);
            doc.rect(x - 2, y - 3, colWidth - 3, (items.length + 1) * lineHeight + 12, 'F');
            doc.text(title, x, y);
            
            // Add items with smaller font
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);
            items.forEach((item, index) => {
                // Label on the left
                doc.text(item.label, x, y + ((index + 1) * lineHeight + 2));
                // Value on the right, aligned
                doc.text(`£${item.value}`, x + colWidth - 15, y + ((index + 1) * lineHeight + 2), { align: 'right' });
            });

            // Add subtotal with different styling
            const subtotalY = y + ((items.length + 1) * lineHeight + 2);
            doc.setDrawColor(231, 76, 60);
            doc.line(x - 2, subtotalY, x + colWidth - 5, subtotalY);
            doc.setFont(undefined, 'bold');
            doc.setFontSize(8);
            doc.text('Subtotal:', x, subtotalY + 4);
            doc.text(`£${items.reduce((sum, item) => sum + parseFloat(item.value), 0).toFixed(2)}`, 
                    x + colWidth - 15, subtotalY + 4, { align: 'right' });
        }

        // 1x Quantity Section
        const costs1xItems = [
            { label: 'Basic Cost:', value: quote.totalBasicCost },
            { label: 'Material Overhead:', value: quote.materialOverhead },
            { label: 'Warranty Cost:', value: quote.warrantyCost },
            { label: 'MOQ Cost:', value: quote.totalMOQCost }
        ];
        addSection('1x Quantity Costs', costs1xItems, startX, summaryY + 20);

        // 15x Quantity Section
        const costs15xItems = [
            { label: 'Basic Cost:', value: quote.totalBasicCost15 },
            { label: 'Material Overhead:', value: quote.materialOverhead15 },
            { label: 'Warranty Cost:', value: quote.warrantyCost15 },
            { label: 'MOQ Cost:', value: quote.totalMOQCost15 }
        ];
        addSection('15x Quantity Costs', costs15xItems, startX + colWidth + colSpacing, summaryY + 20);

        // Additional Charges Section
        const additionalItems = [
            { label: 'Delivery Charges:', value: quote.deliveryChargesTotal || '0.00' },
            { label: 'C of C Charges:', value: quote.cocChargesTotal || '0.00' },
            { label: 'Tooling Charges:', value: quote.toolingChargesTotal || '0.00' }
        ];
        addSection('Additional Charges', additionalItems, startX + (colWidth * 2) + (colSpacing * 2), summaryY + 20);

        // Calculate total height of sections
        const sectionHeight = (costs1xItems.length + 3) * lineHeight;

        // Add grand total with distinctive styling
        const totalY = summaryY + 20 + sectionHeight + 25;
        doc.setFillColor(231, 76, 60);
        doc.rect(15, totalY - 4, doc.internal.pageSize.getWidth() - 30, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(10);

        const totalCost = (
            costs1xItems.reduce((sum, item) => sum + parseFloat(item.value), 0) +
            costs15xItems.reduce((sum, item) => sum + parseFloat(item.value), 0) +
            additionalItems.reduce((sum, item) => sum + parseFloat(item.value), 0)
        ).toFixed(2);

        doc.text('TOTAL COST:', 25, totalY + 5);
        doc.text(`£${totalCost}`, doc.internal.pageSize.getWidth() - 25, totalY + 5, { align: 'right' });

        // Add footer with page numbers and company info to all pages
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            
            // Add footer background
            doc.setFillColor(241, 241, 241);
            doc.rect(0, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth(), 20, 'F');
            
            // Add page numbers
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(
                `Page ${i} of ${pageCount}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
            
            // Add company contact info in footer
            doc.text(
                'Protronix | Glasgow, Scotland | Phone: +44 (0)1698 741007 | Email: info@protronix-uk.com',
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 5,
                { align: 'center' }
            );
        }

        // Save the PDF
        doc.save(`quote_${quote.quoteNumber}.pdf`);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF: ' + error.message + '\nPlease check the browser console for more details.');
    }
}

function editQuote(index) {
    localStorage.setItem("editQuoteIndex", index);
    window.location.href = "/";
}

function deleteQuote(index) {
    if (confirm('Are you sure you want to delete this quote?')) {
        const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
        quotes.splice(index, 1);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        loadQuotes(); // Refresh the table
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Setup assembly quantity change listener
    const assemblyQtyInput = document.querySelector('[name="assembly_qty"]');
    if (assemblyQtyInput) {
        assemblyQtyInput.addEventListener('input', updateTotalCosts);
    }

    // Initial setup for existing rows on pages 3, 4, and 5
    [3, 4, 5].forEach(pageNumber => {
        const pageTable = document.querySelector(`#page${pageNumber} table tbody`);
        if (pageTable) {
            pageTable.querySelectorAll('tr').forEach(row => {
                setupCalculations(row, pageNumber);
            });
        }
    });

    // Initial calculations
    updatePage5Totals();
    updateTotalCosts();

    // Load quotes if we're on the stored quotes page
    if (document.getElementById('quote-table-body')) {
        loadQuotes();
    }
});