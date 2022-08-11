import React from "react";
import { Link } from "react-router-dom";
import "./FooterColumn.css";

function FooterColumn({ title, categories }) {
  return (
    <div className="footer_center__column">
      <span>{title}</span>
      {categories.map((category) => (
        <Link
          to={`/${category.link}`}
          key={category.name}
          className="footer_column__links"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default FooterColumn;
