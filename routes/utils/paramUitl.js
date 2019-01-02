function page(originParam,param) {
    param.page = [originParam.page||1,originParam.limit||10];
    return param;
}

module.exports = {
    page:page
};