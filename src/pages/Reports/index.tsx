import TopBar from "@/components/Topbar";
import styles from './styles.module.scss';
import { Card, Col, Row, Statistic, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/API";

const columns = [
  {
    title: 'Property Name',
    dataIndex: 'propertyName',
    key: 'propertyName',
  },
  {
    title: 'Visits Today',
    dataIndex: 'visitsToday',
    key: 'visitsToday',
    render: (text: any) => <>{text || '--'}</>
  },
  {
    title: 'Visits Yesterday',
    dataIndex: 'visitsYesterday',
    key: 'visitsYesterday',
    render: (text: any) => <>{text || '--'}</>
  },
];


const Reports = () => {
  interface ReportData {
    mostVisitedProperty: string;
    [key: string]: any;
  }

  const [data, setData] = useState<ReportData>({ mostVisitedProperty: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.post('/kyv/api/builder/visitReport')
    .then((res: any) => setData(res.data))
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.reports}>
      <div className={styles.topContainer}>
        <TopBar isMenu={true} />
      </div>
      <div className={styles.bottomContainer}>
        <Row gutter={16}>
          <Col span={6}>
            <Card >
              <Statistic title="Total Visits today" value={data.totalVisitsToday} />
            </Card>
          </Col>
          <Col span={6}>
            <Card >
              <Statistic title="Total visits yesterday" value={data.totalVisitsYesterday} />
            </Card>
          </Col>
          <Col span={12}>
            <Card >
              <Statistic title="Most visited property" value={data.mostVisitedProperty} />
            </Card>
          </Col>
        </Row>
        <Table className={styles.table} dataSource={data.data} columns={columns} loading={loading} pagination={false} />
      </div>
    </div>
  );
}

export default Reports;