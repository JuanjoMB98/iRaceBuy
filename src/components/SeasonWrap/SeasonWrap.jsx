import "./SeasonWrap.css";

import React from "react";
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import SeasonViewer from "../SeasonViewer/SeasonViewer.jsx";

export default function TabsEnclosedPillsExample({ allSeasons }) {
    return (
        <CTabs defaultActiveItemKey="classd">
            <CTabList variant="enclosed-pills">
                <CTab itemKey="rookie">Rookie</CTab>
                <CTab itemKey="classd">Class D</CTab>
                <CTab itemKey="classc">Class C</CTab>
                <CTab itemKey="classb">Class B</CTab>
                <CTab itemKey="classa">Class A</CTab>
                <CTab itemKey="all">All Categories</CTab>
            </CTabList>
            <CTabContent>
                <CTabPanel className="p-3" itemKey="rookie">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={1}
                        defaultSelectedIds={[5389, 5390, 5428, 5429]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classd">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[
                            5391, 5394, 5395, 5432, 5433, 5396,
                        ]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classc">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[
                            5413, 5416, 5417, 5442, 5443, 5406,
                        ]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classb">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[
                            5420, 5421, 5422, 5450, 5451, 5424,
                        ]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classa">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[5426, 5427, 5452, 5453]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="all">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[
                            5395, 5420, 5421, 5426, 5427, 5433, 5396,
                        ]}
                    />
                </CTabPanel>
            </CTabContent>
        </CTabs>
    );
}
