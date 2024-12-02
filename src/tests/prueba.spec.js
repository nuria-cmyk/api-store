function sumar(num1, num2) {
    return num1 + num2
}

describe('pruebas para la función sumar', () => {

    it('debería devolver la suma de los dos números', () => {
        const result = sumar(4, 5)
        expect(result).toBe(9)

    })

})