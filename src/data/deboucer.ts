const debounce = (func:any, delay:number) => {
    let debounceTimer:ReturnType<typeof setTimeout>;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

export default debounce;