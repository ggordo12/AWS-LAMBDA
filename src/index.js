'use strict';

const dbCustomerManager = require('./managers/dbCustomerManager');
const dbProductManager  = require('./managers/dbProductManager');
const dbCompanyManager  = require('./managers/dbCompanyManager');
const dbBudgetManager   = require('./managers/dbBudgetManager');


exports.customerHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.customerid){
                getCustomer(event.pathParameters.customerid, callback);
            }else{
                getAllCustomers(callback);            
            } 
            break;
        case 'POST':
            addCustomer(event.body, callback);
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
    }
};


//Customer Functions
const getAllCustomers = (callback) => {
    dbCustomerManager.getAllCustomers()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback());
    });
};

const getCustomer = (customerid, callback) => {
    dbCustomerManager.getCustomer(customerid)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const addCustomer = (data, callback) => {
    data = JSON.parse(data);

    dbCustomerManager.addCustomer(data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};
//End Customer Functions


exports.productHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.productid){
                getProduct(event.pathParameters.productid, callback);
            }else{
                getAllProducts(callback);         
            } 
            break;
        case 'POST':
            addProduct(event.body, callback);            
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
    }
};

//Product Functions
const getAllProducts = (callback) => {
    dbProductManager.getAllProducts()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const getProduct = (productid, callback) => {
    dbProductManager.getProduct(productid)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const addProduct = (data, callback) => {
    data = JSON.parse(data);
	
	dbProductManager.addProduct(data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};
//End Product Functions


exports.companyHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.vatregnumber){
                getCompany(event.pathParameters.vatregnumber, callback);
            }else{
                getAllCompanies(callback);         
            } 
            break;
        case 'POST':
            addCompany(event.pathParameters.customerid, event.body, callback);            
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
    }
};

//Company Functions
const getAllCompanies = (callback) => {
    dbCompanyManager.getAllCompanies()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const getCompany = (vatregnumber, callback) => {
    dbCompanyManager.getCompany(vatregnumber)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const addCompany = (customerid, data, callback) => {
    data = JSON.parse(data);

    dbCompanyManager.addCompany(customerid, data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};
//END Company Functions


exports.budgetHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.budgetid){
                getBudget(event.pathParameters.budgetid, callback);
            }else{
                getAllBudgets(callback);         
            } 
            break;
        case 'POST':
            addBudget(event.pathParameters.customerid,event.body, callback);            
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
	}
};

//Budget Functions
const getAllBudgets = (callback) => {
    dbBudgetManager.getAllBudgets()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const getBudget = (budgetid, callback) => {
    dbBudgetManager.getBudget(budgetid)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};

const addBudget = (customerid, data, callback) => {
    data = JSON.parse(data);

    dbBudgetManager.addBudget(customerid, data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(400, err, callback);
    });
};
//END Budget Functions

const sendResponse = (statusCode, message, callback) => {
    const res = {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin' : 'https://acevedo.biz',
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json' 
		},
		body: JSON.stringify(message)
	};
    callback(null, res);
};
