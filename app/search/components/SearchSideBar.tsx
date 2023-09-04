import { PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSideBar({ locations, cuisines, searchParams }: { locations: string[], cuisines: string[], searchParams: { city?: string, cuisine?: string, price?: PRICE } }) {
    return (
        <div className="w-1/5">
            <div className="border-b pb-4 flex flex-col">
                <h1 className="mb-2">Region</h1>
                {locations.map(location => (
                    <Link href={{
                        pathname: '/search',
                        query: {
                            // udemy next video 45
                            ...searchParams,
                            city: location
                        }
                    }} className="font-light text-reg capitalize" key={location}>{location}</Link>
                ))}
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
                <h1 className="mb-2">Cuisine</h1>
                {cuisines.map(cuisine => (
                    <Link href={{
                        pathname: '/search',
                        query: {
                            ...searchParams,
                            cuisine: cuisine
                        }
                    }} className="font-light text-reg capitalize" key={cuisine}>{cuisine}</Link>
                ))}
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    <Link href={{
                        pathname: '/search',
                        query: {
                            ...searchParams,
                            price: PRICE.CHEAP
                        }
                    }} className="border w-full text-reg font-light rounded-l p-2">
                        $
                    </Link>
                    <Link href={{
                        pathname: '/search',
                        query: {
                            ...searchParams,
                            price: PRICE.REGULAR
                        }
                    }} className="border w-full text-reg font-light rounded-l p-2">
                        $$
                    </Link>
                    <Link href={{
                        pathname: '/search',
                        query: {
                            ...searchParams,
                            price: PRICE.EXPENSIVE
                        }
                    }} className="border w-full text-reg font-light rounded-l p-2">
                        $$$
                    </Link>
                </div>
            </div>
        </div>
    )
}
