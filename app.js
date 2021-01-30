const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/',(req, res) =>{
    return res.status(200).json({
        message: "My Rule-Validation API",
        status: "success",
        data: {
          name: "Faniran Olaitan",
          github: "@forestbaba",
          email: "hawlahethan@gmail.com",
          mobile: "07037872918",
          twitter: "@forestbaba"
        }
    })
})



app.post('/validate-rule', (req, res) =>{ 
    
    let requiredBody = Object.keys(req.body)

    if(!requiredBody.includes('rule') || !requiredBody.includes('data')){
        return res.status(400).json({error: true, message:"The rule and data fields are required."})
    }
    if(requiredBody.length > 2){
        return res.status(400).json(responseMsg("Invalid JSON payload passed.","error",null))
    }
    if(!checkObject(req.body.rule)){
        return res.status(400).json(responseMsg("rule should be an object.", "error", null))
    }
    if(!Object.keys(req.body.rule).includes('field')){
        return res.status(400).json(responseMsg('field [field] is missing from data.', "error", null))
    }
    if(!Object.keys(req.body.rule).includes('condition')){
        return res.status(400).json(responseMsg('field [condition] is missing from data.', "error", null))
    }
    if(!Object.keys(req.body.rule).includes('condition_value')){
        return res.status(400).json(responseMsg('field [condition_value] is missing from data.', "error", null))
    }
    if(checkObject(req.body.rule.field)){

        let fieldValue = req.body.rule.field;
        let condition = req.body.rule.condition;
        let conditionValue = req.body.data.missions.count;

        let condition1 = "eq";
        let condition2 = "neq";
        let condition3 = "gt";
        let condition4 = "gte";
        let condition5 = "contains";
        let dataArray = Object.keys(req.body.data)

    
        if(fieldValue){

            
            let subKey = Object.keys(req.body.rule.field)
            
            if(dataArray.includes(""+subKey)){

                if(JSON.stringify(Object.keys(fieldValue)) !== JSON.stringify(subKey)){
                    return res.status(400).json(responseMsg(`field [${subKey}}] is missing from field value.`, "error", null))
                }
                if(fieldValue.missions.count){

    
                    if(condition === condition1){

                        if(conditionValue === fieldValue.missions.count){
                            return res.status(200).json(responseMsg({ message:`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} successfully validated.`, 
                            status:"success",
                            data: {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }}) )
                        }else{
                            return res.status(400)
                            .json(responseMsg(`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} failed validation.`,"error", 
                              {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }))
                        }
                    }else if(condition === condition2){

                        if(conditionValue < fieldValue.missions.count || conditionValue > fieldValue.missions.count){
    
                            return res.status(200).json(responseMsg({ message:`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} successfully validated.`, 
                            status:"success",
                            data: {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }}) )
                        }else{
                             return res.status(400)
                            .json(responseMsg(`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} failed validation.`,"error", 
                              {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }))
                        }
                    }else if(condition === condition3){
                        if(conditionValue > fieldValue.missions.count){
                            return res.status(200).json(responseMsg({ message:`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} successfully validated.`, 
                            status:"success",
                            data: {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }}) )
                        }else{
                             return res.status(400)
                            .json(responseMsg(`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} failed validation.`,"error", 
                              {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }))
                        } 
                    } else if(condition === condition4){
                        if(req.body.data.missions.count >= fieldValue.missions.count){
                            return res.status(200).json(responseMsg({ message:`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} successfully validated.`, 
                            status:"success",
                            data: {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }}) )
                        }else{
                             return res.status(400)
                            .json(responseMsg(`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} failed validation.`,"error", 
                              {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }))
                        }
                    }else if(condition === condition5){

                        if(conditionValue === fieldValue.missions.count){
                            return res.status(200).json(responseMsg({ message:`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} successfully validated.`, 
                            status:"success",
                            data: {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }}) )
                        }else{
                             return res.status(400)
                            .json(responseMsg(`field ${Object.getOwnPropertyNames(fieldValue)[0] + "." +Object.getOwnPropertyNames(fieldValue.missions)[0]} failed validation.`,"error", 
                              {
                                validation: {
                                  "error": false,
                                  "field": `${Object.getOwnPropertyNames(fieldValue.missions)[0]}`,
                                  "field_value": fieldValue.missions.count,
                                  "condition": req.body.rule.condition,
                                  "condition_value": req.body.rule.condition_value
                                }
                              }))
                        }
                    }else{
                      console.log('==')
                      return res.status(400).json(responseMsg(`Invalid condition [${req.body.rule.condition}] payload passed.`,"error", null))
                    }
    
                }else{
                    return res.status(400).json({status:"error", message:"nested field value is not a valid json object"})
                }
              

            } else {
                return res.status(400)
                        .json(responseMsg(`field [${subKey}] failed validation.`,"error", 
                          {
                            validation: {
                              "error": false,
                              "field": `${subKey}`,
                              "field_value": fieldValue.missions.count,
                              "condition": req.body.rule.condition,
                              "condition_value": req.body.rule.condition_value
                            }
                          }))
            }            
           
        }else{
                  return res.status(400).json(responseMsg("Invalid JSON payload passed.","error", null))

        }


    }else{

        return res.status(400).json(responseMsg("field [rule] should be a|an [object].","error", null))
    }


})

const checkObject=(obj)=> {
    return obj != null && obj.constructor.name === "Object"
}
const responseMsg =(message, status,data)=>{
    return{ message,
        status,
        data
    }
}

app.listen(PORT, () =>{
    console.log(`App listening on ${PORT}`)
})