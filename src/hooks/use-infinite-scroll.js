import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (fetchData) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState(1)
	const observer = useRef()

	const loadMore = async () => {
		setIsLoading(true)
		const { error , lastPage } = await fetchData(page)

		if (error) {
			setIsLoading(false)
			return
		}
		setHasMore(page < lastPage)
		setIsLoading(false)
	}

	useEffect(() => {
		loadMore()
	}, [page])

	const lastElementRef = (node) => {
		if (isLoading) return
		if (observer.current) observer.current.disconnect()

		const callback = (entries) => {
			if (entries[0].isIntersecting && hasMore) {
				setPage((prevPage) => prevPage + 1)
			}
		}

		const options = {
			root: null,
			rootMargin: '0px 0px 350px 0px',
			threshold: 0,
		}

		observer.current = new IntersectionObserver(callback, options)
		if (node) observer.current.observe(node)
	}

	return { isLoading, lastElementRef, page, hasMore }
}
