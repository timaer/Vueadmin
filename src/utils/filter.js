
const filters={
    timeToDate:function(timestamp){
        const date = new Date(timestamp*1000);
        return date.getFullYear() + '-'+
        (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'+
        date.getDate() + ' '+
        date.getHours() + ':'+
        date.getMinutes() + ':'+
        date.getSeconds()
    },
    toStatusStyle:function(status){
        const statusMap=["danger","primary","success"]
        return statusMap[status]
    },
    toStatusWord:function(status){
        const statusMap=["待支付","已支付","已完成"]
        return statusMap[status]
    },
    toPaytype:function(paytype){
        const typeMap={"1":"支付宝",'2':"微信"}
        return typeMap[paytype]
    }   
}
export default filters