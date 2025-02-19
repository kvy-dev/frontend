import BrokerCard from './BrokerCard';

interface Props {
  data: any;
  searchString: string;
  activeTab: string;
  refetch: () => void;
}

const Brokers = ({ data, searchString, activeTab, refetch }: Props) => {
  return (
    <>
      {
        data.map((d: any) => {
          if (!searchString || d?.name?.includes(searchString))
            return <BrokerCard key={d?.propertyId} data={d} activeTab={activeTab} refetch={refetch} />   
        })
      }
    </>
  )
}

export default Brokers;