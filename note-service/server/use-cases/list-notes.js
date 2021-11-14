export default function makeListNotes({ backendDb }) {
    return async function listNotes(customerId) {        
        if(!customerId){
            throw new Error("Customer ID is required!")
        }
        const response = await backendDb.findAll({ customerId})
        if (response.length == 0) {
            throw new RangeError('Notes Not Found')
        }
        return response;
    }
}