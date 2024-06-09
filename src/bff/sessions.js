export const sessions = {
	list: {},

	create(user) {
		const hash = Math.random().toFixed(50)

		this.list[hash] = user

		return hash
	},

	async remove(hash) {
		delete this.list[hash]
	},

	add(sessionHash, user) {
		this.list[sessionHash] = user
	},

	access(hash, accessRoles) {
		const user = this.list[hash]

		return !!user && accessRoles.includes(user.roleId)
	},
}
