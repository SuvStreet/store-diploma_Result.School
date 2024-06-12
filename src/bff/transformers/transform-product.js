export const transformProduct = (dbProduct) => {
	return {
		id: dbProduct.id,
		name: dbProduct.name,
		description: dbProduct.description,
		price: dbProduct.price,
		categoryId: dbProduct.category_id,
		catalogId: dbProduct.catalog_id,
		imageUrl: dbProduct.image_url
	}
}
