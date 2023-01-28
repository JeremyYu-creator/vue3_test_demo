const mockVideolist = [
    {
        attribution: "Liyao Xie / Getty Images",
        firstFrame: {
            i1080: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
            i1440: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcgc.img",
            i2160: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEhXT.img"
        },
        video: {
            v1080: "https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4",
            v1440: "https://prod-streaming-video-msn-com.akamaized.net/ba258271-89c7-47bc-9742-bcae67c23202/f7ff4fe4-1346-47bb-9466-3f4662c1ac3a.mp4",
            // v2160: "https://prod-streaming-video-msn-com.akamaized.net/b7014b7e-b38f-4a64-bd95-4a28a8ef6dee/113a2bf3-3a5f-45d4-8b6f-e40ce8559da3.mp4"
            v2160: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
        }
    },
    {
        attribution: "Yiming Li / Getty Images",
        firstFrame: {
            i1080: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEhRG.img",
            i1440: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEe5M.img",
            i2160: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEiHa.img"
        },
        video: {
            v1080: "https://prod-streaming-video-msn-com.akamaized.net/0b927d99-e38a-4f51-8d1a-598fd4d6ee97/3493c85c-f35a-488f-9a8f-633e747fb141.mp4",
            v1440: "https://prod-streaming-video-msn-com.akamaized.net/bc3e9341-3243-4d2c-8469-940fef56ca2d/4720a02b-eabd-4593-a1d9-5c5d61916853.mp4",
            v2160: "https://prod-streaming-video-msn-com.akamaized.net/35960fe4-724f-44fc-ad77-0b91c55195e4/bfd49cd7-a0c6-467e-ae34-8674779e689b.mp4"
        }
    },
    {
        attribution: "onuroner / Getty Images",
        firstFrame: {
            i1080: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEiEk.img",
            i1440: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEhUA.img",
            i2160: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEe9h.img"
        },
        video: {
            v1080: "https://prod-streaming-video-msn-com.akamaized.net/9752d732-2354-483f-a678-a6d0cd2c22b7/1a5ed13a-43f5-4e85-95c8-6579065c4d7c.mp4",
            v1440: "https://prod-streaming-video-msn-com.akamaized.net/13d2da4a-b642-4dc5-96ea-c13210066046/3fc2b744-a5f4-4031-be45-1e4c72010eb6.mp4",
            v2160: "https://prod-streaming-video-msn-com.akamaized.net/67699b85-15a5-4411-8e50-c3232b468f4d/0c4d59de-a4fc-4e82-86b7-3b0610febcdb.mp4"
        }
    },
    {
        attribution: "Yiming Li / Getty Images",
        firstFrame: {
            i1080: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOE58B.img",
            i1440: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcge.img",
            i2160: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEhXX.img"
        },
        video: {
            "v1080": "https://prod-streaming-video-msn-com.akamaized.net/fe13f13c-c2cc-4998-b525-038b23bfa9b5/1a9d30ca-54be-411e-8b09-d72ef4488e05.mp4",
            "v1440": "https://prod-streaming-video-msn-com.akamaized.net/6f18a83a-8d2a-4d01-b007-64fa411ea296/b619cc27-1c33-4d13-8488-d025aeaa7a8c.mp4",
            "v2160": "https://prod-streaming-video-msn-com.akamaized.net/e6f8c1b2-b1ac-4343-a8bf-bd79a4d25380/9de24622-e13e-4741-95a6-04fdc39eb2b0.mp4"
        }
    },
    {
        attribution: "Schroptschop / Getty Images",
        firstFrame: {
            i1080: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEe2I.img",
            i1440: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEiFq.img",
            i2160: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEab5.img"
        },
        video: {
            v1080: "https://prod-streaming-video-msn-com.akamaized.net/fb194c01-2ff6-4b4e-afbd-a00289124c4c/af7a74f5-5cb6-423e-b428-d05c0d36478d.mp4",
            v1440: "https://prod-streaming-video-msn-com.akamaized.net/66dcf148-272c-408c-82fc-b80bc8d0d533/be559c34-a832-4fc4-9573-02e896ba9c0b.mp4",
            v2160: "https://prod-streaming-video-msn-com.akamaized.net/da8b8a96-5a73-4a17-8ed8-960b8cd5afb1/30223688-167c-48a2-aa96-9764378a92d4.mp4"
        }
    },
    {
        attribution: "Onfokus / Getty Images",
        firstFrame: {
            i1080: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEe2H.img",
            i1440: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEiFp.img",
            i2160: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEiHj.img"
        },
        video: {
            v1080: "https://prod-streaming-video-msn-com.akamaized.net/e908e91f-370f-49ad-b4ce-775b7e7a05b4/a6287f74-46f0-42f9-b5d9-997f00585696.mp4",
            v1440: "https://prod-streaming-video-msn-com.akamaized.net/7d869c98-43ba-4e12-b789-de46ef2156a1/46aa0a69-7192-48b3-a96d-efee1a0bd4c3.mp4",
            v2160: "https://prod-streaming-video-msn-com.akamaized.net/c0f610f9-4fb1-4222-9ab5-a62f630a03ac/8caf2d97-2c57-48c9-8582-808b42089e3f.mp4"
        }
    },
]
export default mockVideolist