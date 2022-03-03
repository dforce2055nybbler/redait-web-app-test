import * as React from 'react';
import { ListGroup, Image } from 'react-bootstrap';


export default function TeamList({ team }) {
  return (
    <ListGroup as="ol" numbered className="team">
      {team.map((member, index) => (
        <ListGroup.Item
          className="item"
          key={member.id}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="avatar">
            <Image
              thumbnail
              alt={member.name}
              src={member.src ? member.src : `https://picsum.photos/300/300?random=${index}` }
              />
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{member.job}</div>
            {member.name}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
