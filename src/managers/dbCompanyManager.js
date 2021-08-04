const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const companyTable = 'companies';
const customerTable = 'customers';


const getAllCompanies = () => {
    const params = {
        TableName: companyTable
    };

    return docClient.scan(params).promise();
};


const getCompany = (vatregnumber) => {
    const params = {
        TableName: companyTable,        
        KeyConditionExpression: "vatregnumber = :vatregnumber",
        ExpressionAttributeValues: {
            ":vatregnumber": vatregnumber
        },
    };
    return docClient.query(params).promise();
};


const addCompany = async (customerid, companyData) => {
    
    var existingCompany = await checkCompany(companyData.vatregnumber);

    if (typeof existingCompany.Items[0] === 'undefined'){
        const companyid = uuid.v1();
        const params = {
            TableName: companyTable,
            Item: {
                "companyid": companyid,
                "vatregnumber": companyData.vatregnumber,
                "name": companyData.name,
                "country": companyData.country,
                "industry": companyData.industry
            }
        };
    
    
        const companyInfo = {
            "companyid": companyid,
            "vatregnumber": companyData.vatregnumber,
            "name": companyData.name,
            "country": companyData.country,
            "industry": companyData.industry
        };
    
        setCompany(customerid, companyInfo);

        await docClient.put(params).promise();

        return companyid;



    }else{

        const existingCompanyInfo = {
            "companyid": existingCompany.Items[0].companyid,
            "vatregnumber": existingCompany.Items[0].vatregnumber,
            "name": existingCompany.Items[0].name,
            "country": existingCompany.Items[0].country,
            "industry": existingCompany.Items[0].industry
        };

        await setCompany(customerid, existingCompanyInfo);
        
        return existingCompany.Items[0].companyid;
    }
       
};


async function checkCompany(vatregnumber){
    const companyData = await getCompanyData(vatregnumber);
    return companyData;
}

function getCompanyData(vatregnumber){
    const params = {
        TableName: companyTable,        
        KeyConditionExpression: "vatregnumber = :vatregnumber",
        ExpressionAttributeValues: {
            ":vatregnumber": vatregnumber
        },
    };
    return docClient.query(params).promise();
} 

async function setCompany(customerid, companyData){
    return await addCompanyToCustomer(customerid, companyData);
}

const addCompanyToCustomer = (customerid, companyData) => {
    
    const params = {
        TableName: customerTable,
        Key: {
            "customerid": customerid
        },
        UpdateExpression: 'set company = :company',
        ExpressionAttributeValues:{
            ":company": companyData
        },
        ReturnValues: "UPDATED_NEW"
    };
    return docClient.update(params).promise();
}


module.exports = {
    getAllCompanies,
    getCompany,
    addCompany
};