class PageState {
    constructor(fields, error, message){
        this.products = []
        this.customers = []
        this.payments = []
        this.fields = fields
        this.error = error
    }
    setFields(mFields){
        this.fields = mFields
    }
    setError(mError){
        this.error = mError
    }
}
module.exports = PageState