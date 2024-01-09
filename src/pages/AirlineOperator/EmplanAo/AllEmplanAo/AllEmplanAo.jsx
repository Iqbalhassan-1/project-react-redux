import { Col, Container, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import Active from "../../../../components/Status/Active";
import { Link } from "react-router-dom";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import style from "./allemplanao.module.css";
import CreateEmplanAo from "../CreateEmplanAo/CreateEmplanAo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getEmpAo,
  setEmissionReportVeiwDataEmp,
} from "../../../../store/AirlineOperator/EmissionsMonitoringPlan/EmissionMonitoringPlanSlice";
import moment from "moment";
import Loader from "../../../../components/Loader/Loader";
import {
  ToSentenceCase,
  toSentenceCase,
} from "../../../../utils/toSentenceCase";
import Pending from "../../../../components/Status/Pending";

const AllEmplanAo = ({
  setShowEmplan,
  showModal,
  setShowModal,
  onSwitchToDrafts,
  setShowEmDraft,
  index,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmpAo());
  }, [dispatch, index]);
  const { allEmissionMonitoringPlanAo, loading } = useSelector(
    (state) => state.emissionMonitoringPlan
  );
  console.log("Emission monitoring planAo", allEmissionMonitoringPlanAo);
  const reversedReports = [...allEmissionMonitoringPlanAo].reverse();

  const handleVeiw = (data) => {
    setShowEmplan(true);
    dispatch(setEmissionReportVeiwDataEmp(data));
  };
  return (
    <>
      <Container fluid className="main-class">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center">
              <Col md={9}>
                <h4 className="py-3">Emissions Monitoring Plan</h4>
              </Col>
              <Col md={3}>
                <CreateButton
                  icon
                  title={"Add New"}
                  onClick={() => setShowModal(true)}
                  width={"200px"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Table className={style.tableclass}>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Approval/Rejection Date</th>
                      <th>Monitoring Method</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reversedReports.length === 0 ? (
                      <h5 className="py-3 text-muted">No emissions monitoirng plan to display</h5>
                    ) : (
                      reversedReports.map((data, index) => (
                        <tr>
                          <td>{data.version}</td>
                          <td>
                            {" "}
                            {moment(data?.createdAt).format("DD MMMM YYYY")}
                          </td>
                          <td>{toSentenceCase(data.monitoring_method)}</td>
                          <td>
                            <div className="d-flex">
                              {data?.sa_status === "pending" ? (
                                <Pending />
                              ) : (
                                <Active />
                              )}
                            </div>
                          </td>
                          <td>
                            <td>
                              <Link
                                to="/ao/EmissionMonitoringPlan"
                                className="d-flex align-items-center gap-1"
                                onClick={() => {
                                  handleVeiw(data);
                                }}
                              >
                                <span style={{ paddingBottom: "2px" }}>
                                  <BsEyeFill size={20} />
                                </span>
                                View
                              </Link>
                            </td>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
        {showModal && (
          <CreateEmplanAo
            showModal={showModal}
            setShowModal={setShowModal}
            setShowEmDraft={setShowEmDraft}
            onSwitchToDrafts={onSwitchToDrafts}
          />
        )}
      </Container>
    </>
  );
};

export default AllEmplanAo;
