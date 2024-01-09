import { Col, Container, Row, Table } from "react-bootstrap";
import Pending from "../../../../components/Status/Pending";
import Verified from "../../../../components/Status/Verified";
import moment from "moment";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";

const AllEmissionReportsVb = ({ data, handleViewReport, loading }) => {
  return (
    <div>
      <Container fluid className="main-class">
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col>
              <h4 className="py-3">Emissions Report</h4>
              <Table className="currentEmission">
                <thead>
                  <tr>
                    <th>Airline Name</th>
                    {/* <th>Monitoring Method</th> */}
                    <th>Year</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length === 0 ? (
                    <h5 className="text-muted py-3">
                      No emissions report to display
                    </h5>
                  ) : (
                    data?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.user?.name}</td>
                          {/* <td>{item?.monitoring_method}</td> */}
                          <td>{item?.year}</td>
                          <td>
                            {moment(item?.createdAt).format("DD MMMM YYYY")}
                          </td>
                          <td>
                            <div className="d-flex">
                              {item?.vb_submit_to_caat === "Y" ? (
                                <Verified />
                              ) : (
                                <Pending />
                              )}
                            </div>
                          </td>
                          <td>
                            <td>
                              <Link
                                to="/vb/emissionreports"
                                className="d-flex align-items-center gap-1"
                                onClick={() => handleViewReport(item)}
                              >
                                <span style={{ paddingBottom: "2px" }}>
                                  <BsEyeFill size={20} />
                                </span>
                                View
                              </Link>
                            </td>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AllEmissionReportsVb;
