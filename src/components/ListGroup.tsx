import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  //   const items = [
  //     "Ramesh",
  //     "Krishna",
  //     "Leo",
  //     "Puttapaka",
  //     "Hyderabad",
  //     "Shilpa",
  //     "Shivani",
  //     "Shireesha",
  //   ];
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  if (items.length === 0) {
    return <p>No Items</p>;
  }

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          key={item}
          className={`list-group-item ${index === activeIndex ? "active" : ""}`}
          onClick={() => {
            handleClick(index);
            onSelectItem(item);
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
