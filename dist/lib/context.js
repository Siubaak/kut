"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createContext(defaultValue) {
    var context = {
        _value: defaultValue,
        Provider: null,
        Consumer: null,
    };
    context.Provider = {
        _context: context
    };
    context.Consumer = context;
    return context;
}
exports.createContext = createContext;
//# sourceMappingURL=context.js.map