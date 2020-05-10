import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks";

export const Content = ({ currentUser }) => (
  <section className="content">
    <Sidebar />
    <Tasks currentUser={currentUser} />
  </section>
);
