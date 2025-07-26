
"use client"
import { useGetCustomerByPhonenumberQuery} from "@/redux/services/mbanking/customer";
// import { CardCarousel } from "../ui/card-carousel";


export default function CarCardDisplay() {
//    declare data, isLoading, isFetching, error 
// const {data, isFetching, isLoading, error} = useGetCustomersQuery({});
const {data} = useGetCustomerByPhonenumberQuery({
  phoneNumber:"098459947"

})
//calling hook to apply with specifics task 
   console.log("This is the data:", data);
  //  console.log(error);
  //  console.log(isLoading);
  //  console.log(isFetching);

  //  const images =
  //    data?.map(item => ({
  //      src: item.image?.startsWith('http') ? item.image : `https://car-nextjs-api.cheatdev.online/${item.image}`,
  //      alt: item.make
  //    })) ?? [];

  return (

    <div>
     {/* <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      /> */}
      
    </div>
  )
}