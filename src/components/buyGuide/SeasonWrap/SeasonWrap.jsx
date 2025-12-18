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
                        defaultSelectedIds={[5893, 5894, 5937, 5938]}
                    />
                </TabsContent>
                <TabsContent value="classd">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[5898, 5903, 5907, 5943, 5941]}
                    />
                </TabsContent>
                <TabsContent value="classc">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[5912, 5913, 5918, 5922, 5924]}
                    />
                </TabsContent>
                <TabsContent value="classb">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[5925, 5926, 5930, 5932, 5934]}
                    />
                </TabsContent>
                <TabsContent value="classa">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[5935, 5936, 5961, 5962]}
                    />
                </TabsContent>
                <TabsContent value="all">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[5893, 5925, 5926, 5936, 5943, 5946, 5935]}
                    />
                </TabsContent>
            </TabsContents>
        </Tabs>
    );
}
