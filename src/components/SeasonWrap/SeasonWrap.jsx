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
                        defaultSelectedIds={[5559, 5599, 5600, 5560]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classd">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[5561, 5566, 5567, 5573, 5576, 5604]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classc">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[5579, 5584, 5587, 5588, 5612, 5613, 5577]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classb">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[5591, 5592, 5593, 5595, 5620, 5621]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="classa">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[5597, 5598, 5622, 5623]}
                    />
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="all">
                    <SeasonViewer
                        client:load
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[5566, 5567, 5591, 5592, 5597, 5598, 5604]}
                    />
                </CTabPanel>
            </CTabContent>
        </CTabs>
    );
}
