import Header from "./components/Header"
import SearchSideBar from "./components/SearchSideBar"
import RestaurantCard from "./components/RestaurantCard"
import { PRICE, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurantByQuery = (searchParams: SearchParams) => {
    const where: any = {

    }
    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location
    }

    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price
    }

    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
        reviews: true
    }

    return prisma.restaurant.findMany({
        where,
        select,
    })
}

const fetchLoacations = async () => {
    const locations = await prisma.location.findMany();
    // here we eliminate the duplicates and return an array, not how its done in the udemy video
    const uniqueNames = Array.from(new Set(locations.map(location => location.name)));
    return uniqueNames;
}
const fetchCuisines = async () => {
    const cuisines = await prisma.cuisine.findMany();
    // here we eliminate the duplicates and return an array, not how its done in the udemy video
    const uniqueNames = Array.from(new Set(cuisines.map(cuisine => cuisine.name)));
    return uniqueNames;
}

// the city?: the ? means that it is optional

export default async function Search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fetchRestaurantByQuery(searchParams)
    const location = await fetchLoacations()
    const cuisine = await fetchCuisines()

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={location} cuisines={cuisine} searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length ? (
                        <>
                            {restaurants.map(restaurant => (
                                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                            ))}
                        </>) : (<p>No restaurants found</p>)}
                </div>
            </div>
        </>


    )
}
