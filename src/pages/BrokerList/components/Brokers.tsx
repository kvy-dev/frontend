import BrokerCard from './BrokerCard';

interface Props {
  data: any;
  activeTab: string;
  refetch: () => void;
}

const Brokers = ({ data, activeTab, refetch }: Props) => {
  return (
    <>
      {
        data.map((d: any) => {
            return <BrokerCard key={d?.propertyId} data={d} activeTab={activeTab} refetch={refetch} />   
        })
      }
    </>
  )
}

export default Brokers;