import { CPlayer } from './lib-player'

export let soundlibrary = [];

const dataSound = [
    // ost
    {
        songData: [
            { // Instrument 0
                i: [
                    2, // OSC1_WAVEFORM
                    100, // OSC1_VOL
                    128, // OSC1_SEMI
                    0, // OSC1_XENV
                    3, // OSC2_WAVEFORM
                    201, // OSC2_VOL
                    128, // OSC2_SEMI
                    0, // OSC2_DETUNE
                    0, // OSC2_XENV
                    0, // NOISE_VOL
                    0, // ENV_ATTACK
                    6, // ENV_SUSTAIN
                    29, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    194, // LFO_AMT
                    4, // LFO_FREQ
                    1, // LFO_FX_FREQ
                    3, // FX_FILTER
                    25, // FX_FREQ
                    191, // FX_RESONANCE
                    115, // FX_DIST
                    244, // FX_DRIVE
                    147, // FX_PAN_AMT
                    6, // FX_PAN_FREQ
                    84, // FX_DELAY_AMT
                    6 // FX_DELAY_TIME
                ],
                // Patterns
                p: [],
                // Columns
                c: [
                ]
            },
            { // Instrument 1
                i: [
                    0, // OSC1_WAVEFORM
                    255, // OSC1_VOL
                    117, // OSC1_SEMI
                    64, // OSC1_XENV
                    0, // OSC2_WAVEFORM
                    255, // OSC2_VOL
                    110, // OSC2_SEMI
                    0, // OSC2_DETUNE
                    64, // OSC2_XENV
                    0, // NOISE_VOL
                    4, // ENV_ATTACK
                    6, // ENV_SUSTAIN
                    35, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    0, // LFO_AMT
                    0, // LFO_FREQ
                    0, // LFO_FX_FREQ
                    2, // FX_FILTER
                    14, // FX_FREQ
                    1, // FX_RESONANCE
                    1, // FX_DIST
                    39, // FX_DRIVE
                    76, // FX_PAN_AMT
                    5, // FX_PAN_FREQ
                    0, // FX_DELAY_AMT
                    0 // FX_DELAY_TIME
                ],
                // Patterns
                p: [, 1, 1, 1, 1, 1, 1, 2, , , , 1, 1, 1, 1, 1, 1, , , 1, 1, 1, 1, 1, 1],
                // Columns
                c: [
                    {
                        n: [147, , , , , , 147, , , , 147, , , , , , 147, , , , , , 147, , , , 147, , , , 147],
                        f: []
                    },
                    {
                        n: [147],
                        f: []
                    }
                ]
            },
            { // Instrument 2
                i: [
                    0, // OSC1_WAVEFORM
                    0, // OSC1_VOL
                    140, // OSC1_SEMI
                    0, // OSC1_XENV
                    0, // OSC2_WAVEFORM
                    0, // OSC2_VOL
                    140, // OSC2_SEMI
                    0, // OSC2_DETUNE
                    0, // OSC2_XENV
                    60, // NOISE_VOL
                    4, // ENV_ATTACK
                    10, // ENV_SUSTAIN
                    68, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    187, // LFO_AMT
                    5, // LFO_FREQ
                    0, // LFO_FX_FREQ
                    1, // FX_FILTER
                    239, // FX_FREQ
                    135, // FX_RESONANCE
                    0, // FX_DIST
                    32, // FX_DRIVE
                    108, // FX_PAN_AMT
                    5, // FX_PAN_FREQ
                    16, // FX_DELAY_AMT
                    4 // FX_DELAY_TIME
                ],
                // Patterns
                p: [, 1, 1, 2, 3, 2, 3, 4, , , , 2, 3, 2, 3, 2, 3, , , 5, 5, 5, 5, 5, 5, 4],
                // Columns
                c: [
                    {
                        n: [, , , , 147, , , , , , , , 148, , , , , , , , 147, , , , , , , , 147],
                        f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                    },
                    {
                        n: [, , , , 147, , , 147, , , , , 148, , , , , , , , 147, , , 147, , , 147, , , , 147],
                        f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                    },
                    {
                        n: [, , , , 147, , , 147, , , , , 148, , , , , , , , 147, , , 147, , , 147, , , 147, 147, 147],
                        f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                    },
                    {
                        n: [147],
                        f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 68]
                    },
                    {
                        n: [147, , , 147, , , 147, , 147, , , 147, , 147, , 147, 147, , , 147, , , 147, , 147, , , 147, , 147, , 147],
                        f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                    }
                ]
            },
            { // Instrument 3
                i: [
                    2, // OSC1_WAVEFORM
                    192, // OSC1_VOL
                    128, // OSC1_SEMI
                    0, // OSC1_XENV
                    2, // OSC2_WAVEFORM
                    192, // OSC2_VOL
                    140, // OSC2_SEMI
                    18, // OSC2_DETUNE
                    0, // OSC2_XENV
                    0, // NOISE_VOL
                    107, // ENV_ATTACK
                    115, // ENV_SUSTAIN
                    138, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    136, // LFO_AMT
                    5, // LFO_FREQ
                    1, // LFO_FX_FREQ
                    2, // FX_FILTER
                    8, // FX_FREQ
                    92, // FX_RESONANCE
                    21, // FX_DIST
                    8, // FX_DRIVE
                    148, // FX_PAN_AMT
                    5, // FX_PAN_FREQ
                    85, // FX_DELAY_AMT
                    8 // FX_DELAY_TIME
                ],
                // Patterns
                p: [3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
                // Columns
                c: [
                    {
                        n: [111],
                        f: []
                    },
                    {
                        n: [114],
                        f: []
                    },
                    {
                        n: [111],
                        f: [25, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 25, 5, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 56]
                    }
                ]
            },
            { // Instrument 4
                i: [
                    3, // OSC1_WAVEFORM
                    0, // OSC1_VOL
                    127, // OSC1_SEMI
                    0, // OSC1_XENV
                    3, // OSC2_WAVEFORM
                    32, // OSC2_VOL
                    127, // OSC2_SEMI
                    0, // OSC2_DETUNE
                    64, // OSC2_XENV
                    218, // NOISE_VOL
                    4, // ENV_ATTACK
                    4, // ENV_SUSTAIN
                    40, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    1, // LFO_WAVEFORM
                    55, // LFO_AMT
                    4, // LFO_FREQ
                    1, // LFO_FX_FREQ
                    2, // FX_FILTER
                    28, // FX_FREQ
                    115, // FX_RESONANCE
                    124, // FX_DIST
                    190, // FX_DRIVE
                    67, // FX_PAN_AMT
                    6, // FX_PAN_FREQ
                    39, // FX_DELAY_AMT
                    1 // FX_DELAY_TIME
                ],
                // Patterns
                p: [, , , 1, 2, 1, 2, 3, , , , 1, 2, 1, 2, 1, 2, , , 1, 4, 1, 4, 1, 4, 3],
                // Columns
                c: [
                    {
                        n: [, , , , 147, , , , , , , , 147, , , , , , , , 147, , , , , , , , 147],
                        f: []
                    },
                    {
                        n: [, , , , 147, , , , , , , , 147, , , , , , , , 147, , , , , , , , 147, , 147, 147],
                        f: []
                    },
                    {
                        n: [147],
                        f: []
                    },
                    {
                        n: [, , , , 147, , , , , , , , 147, , , , , , , , 147, , , , , , , , 147, , , 147],
                        f: []
                    }
                ]
            },
            { // Instrument 5
                i: [
                    0, // OSC1_WAVEFORM
                    91, // OSC1_VOL
                    128, // OSC1_SEMI
                    0, // OSC1_XENV
                    0, // OSC2_WAVEFORM
                    95, // OSC2_VOL
                    123, // OSC2_SEMI
                    15, // OSC2_DETUNE
                    0, // OSC2_XENV
                    0, // NOISE_VOL
                    12, // ENV_ATTACK
                    0, // ENV_SUSTAIN
                    89, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    0, // LFO_AMT
                    0, // LFO_FREQ
                    0, // LFO_FX_FREQ
                    2, // FX_FILTER
                    30, // FX_FREQ
                    61, // FX_RESONANCE
                    0, // FX_DIST
                    20, // FX_DRIVE
                    131, // FX_PAN_AMT
                    0, // FX_PAN_FREQ
                    88, // FX_DELAY_AMT
                    4 // FX_DELAY_TIME
                ],
                // Patterns
                p: [, , , 1, 2, 3, 2, 1, 2, , , 1, 2, 3, 2, 1, 2, , , , , 4, 5, 4, 5],
                // Columns
                c: [
                    {
                        n: [159, , 147, , 154, , 147, , 157, , 147, , 154, , 150, , 159, , 147, , 154, , 147, , 162, , 147, , 154, , 150, , 123],
                        f: [5, 13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 67]
                    },
                    {
                        n: [159, , 147, , 154, , 147, , 157, , 147, , 154, , 150, , 159, , 147, , 154, , 147, , 162, , 147, , 157, , 162, , 126],
                        f: []
                    },
                    {
                        n: [159, , 147, , 154, , 147, , 157, , 147, , 154, , 150, , 159, , 147, , 154, , 147, , 162, , 147, , 154, , 150, , 123],
                        f: [5, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 3]
                    },
                    {
                        n: [159, , 162, , 164, , , , 159, , 162, 164, , , 162, , 159, , 162, , 164, , , , 159, , 162, 164, , , 162],
                        f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 25]
                    },
                    {
                        n: [157, , 162, , 164, , , , 157, , 162, 164, , , 162, , 157, , 162, , 164, , , , 157, , 162, 164, , , 162],
                        f: [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 67]
                    }
                ]
            },
        ],
        rowLen: 5513,   // In sample lengths
        patternLen: 32,  // Rows per pattern
        endPattern: 25,  // End pattern
        numChannels: 6  // Number of channels
    },// air
    {
        songData: [
            { // Instrument 0
                i: [
                    0, // OSC1_WAVEFORM
                    0, // OSC1_VOL
                    140, // OSC1_SEMI
                    0, // OSC1_XENV
                    0, // OSC2_WAVEFORM
                    0, // OSC2_VOL
                    148, // OSC2_SEMI
                    0, // OSC2_DETUNE
                    0, // OSC2_XENV
                    255, // NOISE_VOL
                    158, // ENV_ATTACK
                    158, // ENV_SUSTAIN
                    158, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    109, // LFO_AMT
                    2, // LFO_FREQ
                    1, // LFO_FX_FREQ
                    2, // FX_FILTER
                    20, // FX_FREQ
                    233, // FX_RESONANCE
                    0, // FX_DIST
                    32, // FX_DRIVE
                    88, // FX_PAN_AMT
                    1, // FX_PAN_FREQ
                    144, // FX_DELAY_AMT
                    2 // FX_DELAY_TIME
                ],
                // Patterns
                p: [1],
                // Columns
                c: [
                    {
                        n: [104, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 141],
                        f: [18, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 22, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 88, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 20]
                    }
                ]
            },
        ],
        rowLen: 5513,   // In sample lengths
        patternLen: 110,  // Rows per pattern
        endPattern: 0,  // End pattern
        numChannels: 1  // Number of channels
    },// down
    {
        songData: [
            { // Instrument 0
                i: [
                    0, // OSC1_WAVEFORM
                    255, // OSC1_VOL
                    106, // OSC1_SEMI
                    64, // OSC1_XENV
                    0, // OSC2_WAVEFORM
                    255, // OSC2_VOL
                    106, // OSC2_SEMI
                    0, // OSC2_DETUNE
                    64, // OSC2_XENV
                    0, // NOISE_VOL
                    5, // ENV_ATTACK
                    7, // ENV_SUSTAIN
                    164, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    0, // LFO_AMT
                    0, // LFO_FREQ
                    0, // LFO_FX_FREQ
                    2, // FX_FILTER
                    255, // FX_FREQ
                    0, // FX_RESONANCE
                    3, // FX_DIST
                    27, // FX_DRIVE
                    83, // FX_PAN_AMT
                    5, // FX_PAN_FREQ
                    125, // FX_DELAY_AMT
                    1 // FX_DELAY_TIME
                ],
                // Patterns
                p: [1],
                // Columns
                c: [
                    {
                        n: [147],
                        f: [18, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 88]
                    }
                ]
            },
        ],
        rowLen: 5513,   // In sample lengths
        patternLen: 32,  // Rows per pattern
        endPattern: 0,  // End pattern
        numChannels: 1  // Number of channels
    },// up
    {
        songData: [
            { // Instrument 0
                i: [
                    0, // OSC1_WAVEFORM
                    91, // OSC1_VOL
                    128, // OSC1_SEMI
                    0, // OSC1_XENV
                    0, // OSC2_WAVEFORM
                    95, // OSC2_VOL
                    128, // OSC2_SEMI
                    12, // OSC2_DETUNE
                    0, // OSC2_XENV
                    0, // NOISE_VOL
                    12, // ENV_ATTACK
                    0, // ENV_SUSTAIN
                    72, // ENV_RELEASE
                    0, // ENV_EXP_DECAY
                    0, // ARP_CHORD
                    0, // ARP_SPEED
                    0, // LFO_WAVEFORM
                    0, // LFO_AMT
                    0, // LFO_FREQ
                    0, // LFO_FX_FREQ
                    2, // FX_FILTER
                    255, // FX_FREQ
                    0, // FX_RESONANCE
                    0, // FX_DIST
                    32, // FX_DRIVE
                    83, // FX_PAN_AMT
                    3, // FX_PAN_FREQ
                    130, // FX_DELAY_AMT
                    4 // FX_DELAY_TIME
                ],
                // Patterns
                p: [1],
                // Columns
                c: [
                    {
                        n: [125],
                        f: []
                    }
                ]
            },
        ],
        rowLen: 5513,   // In sample lengths
        patternLen: 32,  // Rows per pattern
        endPattern: 0,  // End pattern
        numChannels: 1  // Number of channels
    }
];
export function makelibrary() {
    dataSound.map((track) => {
        const player = new CPlayer();
        player.init(track);
        let load = false;
        setInterval(() => {
            if (load) {
                return
            }
            load = player.generate() >= 1;
            if (load) {
                var wave = player.createWave();
                var sound = document.createElement("audio");
                sound.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
                soundlibrary.push(sound);
            }
        })
    });
}
