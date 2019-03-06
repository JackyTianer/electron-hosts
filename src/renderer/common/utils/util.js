export default {
    debounce(fn, interval = 500) {
        debugger;
        let timeout = null;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                debugger;
                fn.apply(this, arguments);
            }, interval);
        };
    }
};
