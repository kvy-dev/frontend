import PropertyCard from './PropertyCard';

interface Props {
  data: any;
  searchString: string;
}

const PropertyList = ({ data, searchString }: Props) => {
  return (
    <>
      {
        data.map((d: any) => {
          if (!searchString || d?.name?.toUpperCase()?.includes(searchString.toUpperCase()) || d?.address?.toUpperCase()?.includes(searchString.toUpperCase()))
            return <PropertyCard key={d?.propertyId} data={d} />   
        })
      }
    </>
  )
}

export default PropertyList;