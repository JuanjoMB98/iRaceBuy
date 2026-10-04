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
                        defaultSelectedSeriesIds={[139, 571, 455, 520]}
                    />
                </TabsContent>
                <TabsContent value="classd">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedSeriesIds={[112, 559, 210, 498, 521]}
                    />
                </TabsContent>
                <TabsContent value="classc">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedSeriesIds={[491, 231, 476, 237, 492]}
                    />
                </TabsContent>
                <TabsContent value="classb">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedSeriesIds={[444, 535, 591, 419, 228]}
                    />
                </TabsContent>
                <TabsContent value="classa">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedSeriesIds={[260, 447, 539, 484]}
                    />
                </TabsContent>
                <TabsContent value="all">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        defaultSelectedSeriesIds={[542, 139, 492, 228, 444, 447, 539]}
                    />
                </TabsContent>
            </TabsContents>
        </Tabs>
    );
}
