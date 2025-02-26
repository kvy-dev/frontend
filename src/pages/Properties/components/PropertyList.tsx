import PropertyCard from './PropertyCard';

interface Props {
  data: any;
  activeTab: string;
  refetch: () => void;
}

const PropertyList = ({ data, activeTab, refetch }: Props) => {
  return (
    <>
      {
        data.length > 0 && data?.map((d: any) => {
          return <PropertyCard key={d?.propertyId} data={d} activeTab={activeTab} refetch={refetch} />   
        })
      }
    </>
  )
}

export default PropertyList;