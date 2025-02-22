import PropertyCard from './PropertyCard';

interface Props {
  data: any;
  searchString: string;
  activeTab: string;
  refetch: () => void;
}

const PropertyList = ({ data, searchString, activeTab, refetch }: Props) => {
  return (
    <>
      {
        data?.map((d: any) => {
          if (!searchString || d?.name?.toUpperCase()?.includes(searchString.toUpperCase()) || d?.address?.toUpperCase()?.includes(searchString.toUpperCase()))
            return <PropertyCard key={d?.propertyId} data={d} activeTab={activeTab} refetch={refetch} />   
        })
      }
    </>
  )
}

export default PropertyList;