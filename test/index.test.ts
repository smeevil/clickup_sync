import nock from 'nock'
import clickupSync from '../src'
import { Probot } from 'probot'
import payload from './fixtures/pull_request.json'

const fs = require('fs')
const path = require('path')

describe('My Probot app', () => {
  let probot: any
  let mockCert: string

  beforeAll((done: Function) => {
    mockCert = fs.readFileSync(path.join(__dirname, 'fixtures/mock-cert.pem')).toString()
    done()
  })

  beforeEach(() => {
    nock.disableNetConnect()
    probot = new Probot({ id: 65587, cert: mockCert })
    // Load our app into probot
    probot.load(clickupSync)
  })

  test('updates the status when adding a label', async (done) => {
    // Uncomment if you want to re-record the http calls
    // nock.recorder.rec()

    nock('https://api.github.com:443', { 'encodedQueryParams': true })
      .post('/app/installations/9053668/access_tokens', {})
      .reply(201, {
        'token': 'v1.c1b322698bf017ce53660daebdd6bc2689e3e865',
        'expires_at': '2020-05-20T07:40:13Z',
        'permissions': { 'metadata': 'read', 'pull_requests': 'write', 'single_file': 'read' },
        'repository_selection': 'selected',
        'single_file': '.github/clickup_sync.yml'
      })

    nock('https://api.github.com:443', { 'encodedQueryParams': true })
      .persist()
      .get('/repos/smeevil/clickup_sync/contents/.github/clickup_sync.yml')
      .reply(200, [ '1f8b0800000000000003bd946b6f9b301486ff0b5f37954b80854a55054921d0407329372b5205c65c8a312c90a4a4ea7f9f69f361ed5a6daba67db47dcefb9cf7d8c78f0c892ac49c331017b0dc35776d4fe0595f61e62bd3445d4e4fceb2a2cb7731fb4e449b47340089b10853214232e223259539c4238e93f86f92cc0b8aac8c9122a63c07a9645b1c294c18f35f99dd16d3dcbceb9af69c65a3a63871ce605db15bd4d42ddb56', '08ed0bfc8accc29a7488742dfb515d975b945e5451dba12d25e65d85ef5eb35efc3c73de25c4b88ed917810f215499cabc11fe731334971d302dfb17cd4bea03c17594bca16ea3c3a915bb166d4fedf9d8dd6f8c5d767589c885ba70ddb526ad445f9d2d1773632e7ba2af5dcbe1adbd0e546fe1e8c1cc90a69ab3f28d8934b51c29d065617e0542d574adc595afbbbe288e5c5bf78d309cbb34de178391bbd04363ee08960304e31a8cd6b62e18ebd1e8c6fa554fa53deefa66789c6981115d9dbcd18d50786842a1e3a1ae70b1d0e1f8becea0d1a5ced415ed23ec1d5dd156b71eb0afba1b976b0f76e9690e06aec33dcc37648521ef721c6fbb0fbaedd9bdb76cdad0b7703ca8f1ca3131742e096c7952a8d9d8fa1235bd16ac3d55362756b32171a11d60a510587994645e9b93e981486bc7d42d1cfa2bc934c01e16da1a04a001011cb24a1084198d173624f2bd9199d599b998a4f7d638732b2f07b3320395d29bbab61854920ae3e4486388b63767a735256d086515c474334fd09bc4c03bd06b554cf56e7daf07823bb07238d3fa780430983cd75654dfa7fb9d39ce366429e4795c2518f643753a0f028703fef2d9d73bae0a729d9d94bd72436e0ab580a3550e04afa40e2e36845e0922b04e0a92d13b89a316c922ddbbc305295be6fc9169114effc790d371fa14e6536338fc283fd1fec96ff2f4f403998d11bc89050000' ], [
        'Server',
        'GitHub.com',
        'Date',
        'Wed, 20 May 2020 07:14:55 GMT',
        'Content-Type',
        'application/json; charset=utf-8',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Status',
        '200 OK',
        'X-RateLimit-Limit',
        '5000',
        'X-RateLimit-Remaining',
        '4985',
        'X-RateLimit-Reset',
        '1589958990',
        'Cache-Control',
        'private, max-age=60, s-maxage=60',
        'Vary',
        'Accept, Authorization, Cookie, X-GitHub-OTP',
        'ETag',
        'W/"e4b4cf2ae6e1a9f60e1e0051756129698e94f10c"',
        'Last-Modified',
        'Wed, 20 May 2020 00:57:26 GMT',
        'X-GitHub-Media-Type',
        'github.v3; format=json',
        'Access-Control-Expose-Headers',
        'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, Deprecation, Sunset',
        'Access-Control-Allow-Origin',
        '*',
        'Strict-Transport-Security',
        'max-age=31536000; includeSubdomains; preload',
        'X-Frame-Options',
        'deny',
        'X-Content-Type-Options',
        'nosniff',
        'X-XSS-Protection',
        '1; mode=block',
        'Referrer-Policy',
        'origin-when-cross-origin, strict-origin-when-cross-origin',
        'Content-Security-Policy',
        'default-src \'none\'',
        'Vary',
        'Accept-Encoding, Accept, X-Requested-With',
        'Content-Encoding',
        'gzip',
        'X-GitHub-Request-Id',
        'E7B8:12BA:35939:97C3F:5EC4D8EF'
      ])

    nock('https://api.clickup.com:443', { 'encodedQueryParams': true })
      .put('/api/v2/task/5cp6c9', { 'status': 'po review' })
      .reply(200, [ '1f8b0800000000000003', 'bd57c96e23c911fd1582be2a5bb92f3ad96a8f0c0363b831e39bd1207289246b5464156a6975a3a1fb1c0c78ae9e830df8eebbbfc73f607f8223a922ab24f532b01ba383c8ca64bd8cedbdc878bfaed2fa6aad62aba35b5fac0f7e0ff85c5787dbd5b61a766358d53e40ddafeef06915eb2ade8eedaa1ffc30f6f8fb01de0e9bd81c06380cebabc358d717eb047decaa76a89ac36969fafdd5fbf3b775dbac3a7853c11da2c4a66e3a5cfbc5575ffdfa46585c69ba045d7548f0767d25f098776d312b8efdd0ecd7f78ff7d792b917ce32c385308c732e387df68798c90fb0891de047f19929eb1cd35a532ae4697b6cd3725b69cb2457e7ed58377dd97df0ca777157bd29cfd9d73da01f05bc78f2fe1856a9ac305c5eacc71eba29b2bf81ce7769956075dd55804e2cdd37415b005c81bdaf6a5ce9f78031aa7fb98717111dbf58b75d93ab1a5e557118bb82b71b86b6bfbabcf4c3e0e36e8f69e85f4c592aaf5c3e7ea1bf9c6cdab857f0e2bb765b62e9fbbeda1e00302b7f7c7db1bef343dc41579efe5f37aa433554189af2c2f5cfeb163a825ec4dbbaea87c9b1c16fa76fadef16f5da7655d355c3bb73fd8eb029d95e146f373c5a19aa3d6ca0c78fa78b7d7b04a61753ad6e7205759a63b90609d9321509082e88f44210171d2558872978ceb53e466e0af3b7b11bf7ab574d85feafcf34485dd36e52737798960a0173b52d659720fbb17eb0a0ad7d845d5397ec4c361ee06e33bf7d357423566d73a4eac2466e7c765e6a92b52a367a49424643ad94546506c0739c6d64cbd4738849e72704a6f71713b2e04e4b641489315a22994ec4e9c80963d43acab86254ccc87c89cc42882e3e416667642791c72e641203a7441acf89f30e88f28167e58da2cccfc862892c8433293d41e6676488068d739a00074ea40e1a332615d1d91825a8f198b519592d9129170c9ec9d919d91b8102642c41cf31cedc64e25592247b6993812cf0c019d92e916f6ecccdafae9f20cb337270199cd516a18acdcc1b82981ae312ac67940516e922838fc2016ad2cb25b43a43474f45c8361299051099422021644f520ed40a2c6e1117c5c1e912dad20f40eb0534338a59434a91a0ad19e3916c204e50ef989310a99ea117c80fc5bd0435f7afef3fa4f89a3be114b5babcbdab126c72872cdd8e709489a38e9fed312681ccde939812faab7c24c1605031eb327863249276b6e7652161824384d5d7f006ea2fc1d767d48cdc7b88c845e112a693f1489c159464e5b40747550c7636e9f787d5d0f978fb591ecd0ccd943161a943448cbc8c3c109bb1f8119c61414921d382a1bfabb6bb6115002f09032c4fc92eb967995eb0d5446f1806952aeb516118255639ccb4d7d11aa026b845117dfd143c1bfb0c9c7f898c274e6df4287a90193212347a9f5c2a5c175904c31355b35dafba668bcd67a1cc7e44cdf7431537ede3bd45ca8f19a90ec7effd1806dfdff627295eb6ac8795a9392704d81fdbe0c3c67d09c7bead01dd2dd72cbc234d589baea9ebb13d7bf63f86e462fdc6d72314235be8229ebc391d58ca65ce24a62d616c880390443afce78dc4ca914c092c35b07c512f7f2861fad9fa584c8149150c4a6bc02a2b2ae58314847a0aca509a585cd8f6af7ffcf0ef7ffef906e354ae208fcaede30dcd05ac642a13c959cb22b4e87e329e08542f1ba92b41581cf1e35ff08897bbe67307cc4c493e0baba8222a46857cb48958089164a3a344ae2ab3e4e37ffef6c35fafc7eda7c1e7d6a6b8cade94bcf980e04c18620304628c8bc12b9d38334bf01ffffe0dd4e0fbcf582f16bd3378e628101e132aba06877c024a52a2392960d81ef5f2803f7dff0d263e963bf427c45d7e84ead61aa3b1e72af613a82e35e7c94126893214f784cd0c4505bb3ca4c8bc508ec9bc10f7877356e1dd5cbee53afc017e5787588f78f6007ebfd9c33e1cefd213a94e9b279b262e7fd817ab709a113fc117955232cc0862806357a058e856eb8cf7b7e498f7516bb508f36ff76dd315675e9e24e5ec5219e79e79f471fb4a4b309fb0ef751906f1465cba62759a2fca6c897a36e9def1625e22f570f32ced5f974174eceae518d0b68faeffc3e579624575da572892cd61531fdbeed5c318566ab428e969185be3054270cd17f79e53ad5d376f71d1c758f4fa941214f0ef20ceaf5b2bb9300bf57f3976658a587d8bf3c3617888023a7a4ef513bc3c09d81782eb5b14c5331ad782e23c719ce6e689a944f7febf3e7ccc36e20f0000' ])

    await probot.receive(payload)
    done()
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})

