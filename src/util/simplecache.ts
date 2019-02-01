class SimpleCache {
    innerMap = new Map<any, any>();

    set(key: any, value: any, expire: number) {
        if (value instanceof Promise) {
            value.then(v => this.setValue(key, v, expire));
            return;
        }

        this.setValue(key, value, expire)
    }

    setValue(key: any, value: any, expire: number) {
        console.log(`cache ${key}->${value} for ${expire}ms`);
        this.innerMap.set(key, value);
        setTimeout(() => {
            console.log(`cache ${key} deleted`);
            this.innerMap.delete(key);
        }, expire)
    }

    get(key: any): any {
        return this.innerMap.get(key);
    }
}

const cacheInstance = new SimpleCache();

function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function (...args: any) {
        const argsFlag = JSON.stringify(args);
        const cacheValue = cacheInstance.get(argsFlag);
        if (cacheValue) return cacheValue;

        const ret = fn.apply(this, args);
        cacheInstance.set(argsFlag, ret, 1000 * 60 * 60);
        return ret;
    }
}

export {cache}
