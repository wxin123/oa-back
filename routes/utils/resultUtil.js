function renderError(status,msg) {
    return {
       status:status,
       message:msg
    };
}
function renderList(list,count) {
    return {
        status:200,
        message:'成功',
        list:list||[],
        count:count||0
    }
}
function renderData(data) {
    return {
        status:200,
        message:'成功',
        data:data||{}
    }
}
module.exports = {
    renderError:renderError,
    renderList:renderList,
    renderData:renderData
};