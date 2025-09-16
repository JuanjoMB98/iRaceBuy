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
                        defaultSelectedIds={[5727, 5771, 5772, 5728]}
                    />
                </TabsContent>
                <TabsContent value="classd">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={2}
                        defaultSelectedIds={[
                            5732, 5741, 5744, 5775, 5777, 5737,
                        ]}
                    />
                </TabsContent>
                <TabsContent value="classc">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={3}
                        defaultSelectedIds={[
                            5747, 5752, 5758, 5746,
                        ]}
                    />
                </TabsContent>
                <TabsContent value="classb">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={4}
                        defaultSelectedIds={[
                            5759, 5760, 5764, 5766, 5768,
                        ]}
                    />
                </TabsContent>
                <TabsContent value="classa">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        licenciaId={5}
                        defaultSelectedIds={[5769, 5770, 5795, 5796]}
                    />
                </TabsContent>
                <TabsContent value="all">
                    <SeasonViewer
                        client:load
                        lang={lang}
                        allSeasonData={allSeasons}
                        defaultSelectedIds={[
                            5727, 5747, 5760, 5770, 5777, 5744,
                        ]}
                    />
                </TabsContent>
            </TabsContents>
        </Tabs>
    );
}
