import "./SeasonWrap.css";
import { useTranslations } from "../../locales/utils";
import React from "react";
import SeasonViewer from "../SeasonViewer/SeasonViewer.jsx";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsContents,
} from "../animate-ui/components/tabs";

export default function TabsEnclosedPillsExample({ allSeasons, lang }) {
    const t = useTranslations(lang);

    return (
        <Tabs defaultValue="classd">
            <TabsList className="nav-enclosed-pills">
                <TabsTrigger role="tab" className="nav-link" value="rookie">
                    Rookie
                </TabsTrigger>
                <TabsTrigger role="tab" className="nav-link" value="classd">
                    {t("classD")}
                </TabsTrigger>
                <TabsTrigger role="tab" className="nav-link" value="classc">
                    {t("classC")}
                </TabsTrigger>
                <TabsTrigger role="tab" className="nav-link" value="classb">
                    {t("classB")}
                </TabsTrigger>
                <TabsTrigger role="tab" className="nav-link" value="classa">
                    {t("classA")}
                </TabsTrigger>
                <TabsTrigger role="tab" className="nav-link" value="all">
                    {t("classAll")}
                </TabsTrigger>
            </TabsList>
            <TabsContents>
                <TabsContent value="rookie">
                    <SeasonViewer
                        client:load
                        lang ={lang}
                        allSeasonData={allSeasons}
                        licenciaId={1}
                        defaultSelectedIds={[5559, 5599, 5600, 5560]}
                    />
                </TabsContent>
                <TabsContent value="classd">
                    <SeasonViewer
                        client:load
                        lang ={lang}
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[
                            5561, 5566, 5567, 5573, 5576, 5604,
                        ]}
                    />
                </TabsContent>
                <TabsContent value="classc">
                    <SeasonViewer
                        client:load
                        lang ={lang}
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[
                            5579, 5584, 5587, 5588, 5612, 5613, 5577,
                        ]}
                    />
                </TabsContent>
                <TabsContent value="classb">
                    <SeasonViewer
                        client:load
                        lang ={lang}
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[
                            5591, 5592, 5593, 5595, 5620, 5621,
                        ]}
                    />
                </TabsContent>
                <TabsContent value="classa">
                    <SeasonViewer
                        client:load
                        lang ={lang}
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[5597, 5598, 5622, 5623]}
                    />
                </TabsContent>
                <TabsContent value="all">
                    <SeasonViewer
                        client:load
                        lang ={lang}
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[
                            5566, 5567, 5591, 5592, 5597, 5598, 5604,
                        ]}
                    />
                </TabsContent>
            </TabsContents>
        </Tabs>
    );
}
