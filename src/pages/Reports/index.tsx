import TopBar from "@/components/Topbar";
import styles from './styles.module.scss';
import { Card, Col, Row, Statistic, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/API";

const dataSource = [
  {
    key: '1',
    propertyName: 'DLF One',
    visitsToday: 32,
    visitsYesterday: 20,
  },
  {
    key: '2',
    propertyName: 'Mahagony Mansion',
    visitsToday: 42,
    visitsYesterday: 10,
  },
];

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
  },
  {
    title: 'Visits Yesterday',
    dataIndex: 'visitsYesterday',
    key: 'visitsYesterday',
  },
];


const Reports = () => {
  const [data, setData] = useState(dataSource);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/kyv/api/visitReport')
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
          <Col span={8}>
            <Card >
              <Statistic title="Total Visits today" value={90} />
            </Card>
          </Col>
          <Col span={8}>
            <Card >
              <Statistic title="Total visits yesterday" value={80} />
            </Card>
          </Col>
          <Col span={8}>
            <Card >
              <Statistic title="Most visited property" value="DLF One" />
            </Card>
          </Col>
        </Row>
        <Table className={styles.table} dataSource={data} columns={columns} loading={loading} />
      </div>
    </div>
  );
}

export default Reports;