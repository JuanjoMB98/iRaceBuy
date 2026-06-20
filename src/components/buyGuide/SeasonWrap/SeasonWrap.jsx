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
                        defaultSelectedIds={[6265, 6266, 6313, 6314]}
                    />
                </TabsContent>
                <TabsContent value="classd">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[6273, 6279, 6283, 6319, 6317]}
                    />
                </TabsContent>
                <TabsContent value="classc">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[6286, 6294, 6298, 6300, 6289]}
                    />
                </TabsContent>
                <TabsContent value="classb">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[6302, 6306, 6308, 6310, 6301]}
                    />
                </TabsContent>
                <TabsContent value="classa">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[6337, 6311, 6312, 6338]}
                    />
                </TabsContent>
                <TabsContent value="all">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[6322, 6265, 6289, 6301, 6302, 6311, 6312]}
                    />
                </TabsContent>
            </TabsContents>
        </Tabs>
    );
}
