const readXlsxFile = require('read-excel-file/node');
const convertToJson = require('read-excel-file/schema');
const fileSystem = require('fs');

const StorefrontInventory = require('./../models/storefront-inventory.models');
const utilities = require('./../utilities');
const joiSchemas = require('./../joiSchemas');

const inventorySchema = {
    skuId: {
        prop: 'skuId',
        type: String,
    },
    skuName: {
        prop: 'skuName',
        type: String,
    },
    skuDescription: {
        prop: 'skuDescription',
        type: String,
    },
    skuMeasure: {
        prop: 'skuMeasure',
        type: String,
    },
    skuTags: {
        prop: 'skuTags',
        type: String
    },
    skuPricePerMeasure: {
        prop: 'skuPricePerMeasure',
        type: Number,
    },
    skuCategory: {
        prop: 'skuCategory',
        type: String,
    },
    skuImageUrl: {
        prop: 'skuImageUrl',
        type: String,
    },
};

const getInventory = async (request, response) => {
    const inventory = await StorefrontInventory.find({});
    if (inventory.length) {
        utilities.sendResponse(response, inventory);
    } else {
        utilities.sendResponse(response, {}, 'inventory-not-found');
    }
}

const addInventory = async (request, response) => {
    if (request.files && request.files.inventory) {
        const temporaryFilePath = __dirname + '/' + request.files.inventory.name;
        request.files.inventory.mv(temporaryFilePath, async (error) => {
            if (error) {
                utilities.sendResponse(response, {}, 'file-upload-error');
            } else {
                let excelData = await readXlsxFile(temporaryFilePath);
                if (excelData) {
                    excelData = convertToJson(excelData, inventorySchema);
                    excelData = utilities.validateSku(excelData.rows);
                    fileSystem.unlink(`${temporaryFilePath}`, async (unlinkingError) => {
                        if (unlinkingError) {
                            utilities.sendResponse(response, {}, 'file-upload-error');
                        } else {
                            if (excelData.successRows) {
                              const inventory = await StorefrontInventory.insertMany(excelData.successRows);
                              if (inventory) {
                                utilities.sendResponse(response, excelData);    
                              } else {
                                utilities.sendResponse(response, {}, 'file-upload-error');
                              }
                            }
                        }
                    });  
                    
                }
            }
        })
    }
}

const updateInventory = async (request, response) => {
    const skuId = request.params.skuId;
    const sku = await StorefrontInventory.findOneAndUpdate({skuId}, {...request.body}, {returnOriginal: false});
    if (sku) {
        utilities.sendResponse(response, sku._doc);
    } else {
        utilities.sendResponse(response, {}, 'sku-update-error');
    }
}

const deleteInventory = async (request, response) => {
    const skuId = request.params.skuId;
    const sku = await StorefrontInventory.findOneAndDelete({skuId});
    if (sku) {
        utilities.sendResponse(response, {success: true});
    } else {
        utilities.sendResponse(response, {}, 'sku-update-error');
    }
}

module.exports = {
    getInventory,
    addInventory,
    updateInventory,
    deleteInventory
}