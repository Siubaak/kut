export interface KutContext {
    _value: any
    Provider: any
    Consumer: any
}

export function createContext(defaultValue: any) {
    const context: KutContext = {
        _value: defaultValue,
        Provider: null,
        Consumer: null,
    }

    context.Provider = {
        _context: context
    }

    context.Consumer = context

    return context
}