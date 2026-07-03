import { useMemo } from "react";
import { Polyline } from "@react-google-maps/api";
import polyline from "@mapbox/polyline";
import type { PlanPlace } from "@/entities/place/model/type";
import type { DayRouteData } from "@/features/calculate-distance/model/type";

interface DayRoutePolylineProps {
  dayPlanId: number;
  places: PlanPlace[] | undefined;
  color: string;
  routeData: DayRouteData; // 💡 부모에게 순수하게 주입받도록 변경
}

export const DayRoutePolyline = ({
  dayPlanId,
  color,
  routeData,
}: DayRoutePolylineProps) => {

  const routePaths = useMemo(() => {
    if (!routeData?.distances) return [];

    return routeData.distances.flatMap((distance: any) =>
      distance.steps.map((step: any) => {
        const decodedPoints = polyline.decode(step.polyline);
        const path = decodedPoints.map(([lat, lng]) => ({ lat, lng }));

        return {
          path,
          mode: step.mode, // WALKING, TRANSIT 등
        };
      }),
    );
  }, [routeData]);

  if (routePaths.length === 0) return null;

  return (
    <>
      {routePaths.map((route, idx) => {
        const isWalking = route.mode === "WALKING";

        return (
          <Polyline
            key={`${dayPlanId}-path-${idx}`}
            path={route.path}
            options={{
              strokeColor: isWalking ? "#EA580C" : color,
              strokeWeight: isWalking ? 5 : 6,
              strokeOpacity: 0.8,
              icons: isWalking
                ? [
                    {
                      icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 2 },
                      offset: "0",
                      repeat: "10px",
                    },
                  ]
                : [],
            }}
          />
        );
      })}
    </>
  );
};
