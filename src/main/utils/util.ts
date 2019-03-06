export default {
    generateId(): number {
        return +new Date() + Math.random()
    }
}
