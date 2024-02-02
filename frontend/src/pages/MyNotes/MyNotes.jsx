import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/notes");
        setNotes(data);
      } catch (e) {
        throw new Error(`Couldn't able to fetch data - ${e}`);
      }
    })();
  }, []);
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return <span onClick={decoratedOnClick}>{children}</span>;
  }
  return (
    <MainScreen title="Welcome Aakarsha Kodthiwada...">
      <Link to="createnote">
        <Button>Create new Note</Button>
      </Link>
      {notes.map(({ _id, title, category, content }) => (
        <Accordion key={_id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <CustomToggle as={"text"} variant="link" eventKey="0">
                  {title}
                </CustomToggle>
              </span>
              <div>
                <Button>Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge className="bg-success">Category - {category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{content}</p>
                  <footer className="blockquote-footer">
                    Created On - date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
