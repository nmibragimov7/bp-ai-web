import React from "react";
import {PCA} from "ml-pca";
import {useMemo} from "react";
import {Scatter} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

// Регистрация компонентов Chart.js
ChartJS.register(LinearScale, PointElement, Tooltip);

interface ScatterChartProps {
  centroids: any[];
  descriptions: Record<string, any>;
  result: Record<string, any>;
  onClick: (index: string) => void;
}

const options = {
  scales: {
    x: {
      grid: {
        display: true,
        color: "#D9D9D9",
        tickWidth: 0,
        tickLength: 16,
      },
      title: {
        display: true,
        text: "ось Ox",
      },
    },
    y: {
      grid: {
        display: true,
        color: "#D9D9D9",
        tickWidth: 0,
        tickLength: 16,
      },
      title: {
        display: true,
        text: "ось Oy",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.dataset.label}: (${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)})`;
        },
      },
    },
  },
  maintainAspectRatio: false
};

// Функция для снижения размерности с помощью PCA
function onReduceDimensions(centroids: any[], numComponents = 2) {
  const pca = new PCA(centroids);
  const reduced = pca.predict(centroids, {nComponents: numComponents});
  return reduced.to2DArray();
}

const ScatterChart: React.FC<ScatterChartProps> = ({centroids, descriptions, result, onClick}) => {
  const data = useMemo(() => {
    if (!centroids.length) {
      return {datasets: []};
    }

    // Преобразуем центроиды в двумерные координаты
    const reducedCentroids = onReduceDimensions(centroids);

    return {
      datasets: reducedCentroids.map((centroid, index) => {
        const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
        return {
          label: descriptions[`${index}`] + " - " + `(${result[`${index}`] ? result[`${index}`].length : 0})`,
          data: [{x: centroid[0], y: centroid[1]}],
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
          pointRadius: 5,
        }
      })
    };
  }, [centroids]);

  return (
    <>
      <div className={"grow flex gap-4"}>
        <div className={"grow h-[calc(100vh-64px)] py-4"}>
          <Scatter data={data} options={options}/>
        </div>
        <div className="w-[400px] h-[calc(100vh-96px)] flex flex-wrap overflow-y-auto shadow-gray-500 p-2 my-4">
          {data.datasets.map((dataset: any, index: number) => (
            <div
              key={index}
              className="cursor-pointer w-1/2 shrink-0 flex items-center mb-2 group"
              onClick={() => onClick(`${index}`)}
            >
              <span
                className="w-4 h-4 shrink-0 inline-block mr-2"
                style={{backgroundColor: dataset.backgroundColor}}
              ></span>
              <span className="text-xs transition-all group-hover:text-red">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScatterChart;