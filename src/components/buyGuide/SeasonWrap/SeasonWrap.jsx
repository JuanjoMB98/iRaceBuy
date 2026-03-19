import "./SeasonWrap.css";
import React from "react";
import { useTranslations } from "@locales/utils.js";
import SeasonViewer from "@buyGuide/SeasonViewer/SeasonViewer.jsx";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsContents,
} from "@components/animate-ui/components/tabs.jsx";

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
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={1}
                        defaultSelectedIds={[6082, 6083, 6126, 6127]}
                    />
                </TabsContent>
                <TabsContent value="classd">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[6087, 6092, 6096, 6132, 6130]}
                    />
                </TabsContent>
                <TabsContent value="classc">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[6099, 6107, 6111, 6113, 6102]}
                    />
                </TabsContent>
                <TabsContent value="classb">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[6115, 6119, 6121, 6123, 6114]}
                    />
                </TabsContent>
                <TabsContent value="classa">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[6150, 6124, 6125, 6151]}
                    />
                </TabsContent>
                <TabsContent value="all">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[6132, 6135, 6082, 6102, 6114, 6115, 6125]}
                    />
                </TabsContent>
            </TabsContents>
        </Tabs>
    );
}
