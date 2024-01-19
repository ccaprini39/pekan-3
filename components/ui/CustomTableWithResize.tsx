//component that takes in an array of objects, and renders a table with the data
"use client";

import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";

const sampleData = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface CustomTableWithResizeProps {
  rowResize?: boolean;
  columnResize?: boolean;
  data: object[];
  rowsToDisplay?: string[];
}

export default function CustomTableWithResize(
  props: CustomTableWithResizeProps
) {
  const columns = Object.keys(props.data[0]);

  //so I want the number of rows to be the number of objects in the array
  //and the number of columns to be the number of keys in the first object

  //all I want 

  const numbOfRows = props.data.length;
  const numbOfColumns = columns.length;

  return (
    <div className="grid w-full h-full grid-rows-1">
      
    </div>
  );
}

//so, I want to be able to resize the rows and columns
function WorksWithHorizontal({ data }: any) {
  const columns = Object.keys(data[0]);
  return (
    <div className="w-full">
      <ResizablePanelGroup direction="horizontal" className="flex flex-row">
        {columns.map((column: string, index: number) => {
          return (
            <>
              <ResizablePanel
                minSize={10}
                className="flex flex-col w-full text-2xl capitalize border border-gray-500"
              >
                {column}
                {data.map((row: any) => {
                  return (
                    <p className="w-full p-1 text-sm border border-gray-500">
                      {row[column]}
                    </p>
                  );
                })}
              </ResizablePanel>
              {index !== columns.length - 1 && <ResizableHandle withHandle />}
            </>
          );
        })}
      </ResizablePanelGroup>
    </div>
  );
}

function WorksVertical({ data }: any) {
  return (
    <div className="grid w-full h-full grid-rows-1">
      <ResizablePanelGroup direction="vertical">
        {data.map((row: any, index: number) => {
          return (
            <>
              <ResizablePanel
                minSize={10}
                className="grid grid-cols-1 border border-gray-500"
              >
                {JSON.stringify(row)}
              </ResizablePanel>
              {index !== data.length - 1 && (
                <ResizableHandle withHandle />
              )}
            </>
          );
        })}
      </ResizablePanelGroup>
    </div>
  );
}

//so what I want to do is make 

const simpleFiveByFive = 
[
  [1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25]
]