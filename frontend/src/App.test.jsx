import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ status: 'ok' }) })),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the backend health status once the fetch resolves', async () => {
    render(<App />)

    expect(await screen.findByText('ok')).toBeInTheDocument()
  })
})
